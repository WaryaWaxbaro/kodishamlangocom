import { useState, useRef } from "react";
import Link from "next/link";
import FeaturePropertyCard from "./FeaturePropertyCard";
import SharingModal from "./SharingModal";
import { useUser } from "../context/userContext";

const urls = ["for-rent", "for-sale", "short-stay"];

export default function FeaturedProperties({ thumbnails, listings }) {
  const [sharingInfo, setSharingInfo] = useState({ url: "", title: "" });
  const { currentUser, user } = useUser();

  const sharingModalButton = useRef(null);

  const getThumbnail = (listingId) => {
    const foundThumbnail = thumbnails.find(
      (thumbnail) => thumbnail.id === listingId
    );
    return foundThumbnail?.img ? foundThumbnail.img : "";
  };

  const handleSetsSharingInfo = (url, title) => {
    setSharingInfo({ url, title });
    sharingModalButton.current.click();
  };

  if (!listings) {
    return;
  }

  return (
    <section className="py-5 bg-gray-200">
      <div className="container-lg">
        <div className="text-center">
          <h2 className="fw-bold fs-32 mb-3">Featured Properties</h2>
          <p>These are our featured properties</p>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 g-4 mt-5">
          {listings.map((listing, index) => {
            return (
              <div id={listing.mId} key={listing.mId} className="col">
                <FeaturePropertyCard
                  listing={listing}
                  thumbnail={getThumbnail(listing.mId)}
                  index={index + 1}
                  setSharingInfo={handleSetsSharingInfo}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
        </div>
        <div className="w-100 text-center mt-5">
          <Link href="/for-sale">
            <a className="btn btn-primary btn-lg text-light fs-14 px-4 py-08 rounded-pill">
              <span className="d-flex align-item-center justify-content-center">
                <span className="d-block me-2">View More</span>
                <span className="b-block">
                  <i className="bi bi-arrow-right-circle-fill"></i>
                </span>
              </span>
            </a>
          </Link>
        </div>
      </div>
      <SharingModal sharingInfo={sharingInfo} />
      <button
        ref={sharingModalButton}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#sharingLinksModal"
      >
        Open sharing modal
      </button>
    </section>
  );
}
