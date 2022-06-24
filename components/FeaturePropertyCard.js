import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getApartmentPath, formatPrice } from "../utils";
import { ApartmentModel } from "../models";

import Image from "next/image";
import Link from "next/link";

export default function FeaturePropertyCard({
  listing,
  thumbnail,
  index,
  setSharingInfo,
  currentUser,
}) {
  const [liked, setLiked] = useState(listing.likes?.includes(currentUser?.mId));
  const [updateLikes, setUpdateLikes] = useState(false);

  useEffect(() => {
    setLiked(listing.likes?.includes(currentUser?.mId));
  }, [currentUser]);

  useEffect(() => {
    const handleLike = async () => {
      await new ApartmentModel({
        id: listing.id,
        like: currentUser.mId,
      }).updateLikes();
    };
    if (currentUser && updateLikes) {
      handleLike();
      setLiked(!liked);
      setUpdateLikes(false);
    } else if (updateLikes) {
      toast.error("Please login to like this apartment");
      setUpdateLikes(false);
    }
  }, [updateLikes]);

  return (
    <div className="featured-card w-100 h-100 min-height-300px border border-gray-300 rounded-5 overflow-hidden d-flex flex-column flex-sm-row shadow">
      <div className="featured-card__img h-100">
        <Link href={getApartmentPath(listing.property_status, listing.slug)}>
          <a>
            <div className="w-100 h-100 position-relative cover-img-img">
              {thumbnail ? (
                <Image src={thumbnail} layout="fill" />
              ) : (
                <Image src={`/cities/city_${index}.jpg`} layout="fill" />
              )}
              <div className="position-absolute start-0 top-0 w-100 d-flex justify-content-between">
                {listing.isFeatured && (
                  <button className="btn btn-primary btn-sm m-3 text-light fs-14">
                    Featured
                  </button>
                )}

                {(listing.property_status.indexOf("sale") >= 0 && (
                  <button className="btn btn-sm bg-dark bg-opacity-50 m-3 text-light fs-14">
                    For Sale
                  </button>
                )) ||
                  (listing.property_status.indexOf("rent") >= 0 && (
                    <button className="btn btn-sm bg-dark bg-opacity-50 m-3 text-light fs-14">
                      For Rent
                    </button>
                  ))}
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="featured-card__text position-relative h-100 p-3 p-md-4 bg-white flex-1">
        <Link href={getApartmentPath(listing.property_status, listing.slug)}>
          <a className="text-decoration-none text-dark">
            <div className="w-100">
              <h3 className="fs-16 fw-bold ls-6 mb-2">{listing.title}</h3>
              <p className="d-flex text-gray-600 mb-3">
                <span className="d-block me-2">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <span className="d-block fs-14 ls-6">
                  <span>
                    {listing.street}, {listing.sub_city}, {listing.city}
                  </span>
                </span>
              </p>
              <div className="mw-lg-80 d-flex justify-content-between flex-wrap">
                <div className="w-50" style={{ minWidth: "180px" }}>
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">{listing.bedrooms} Bedrooms</span>
                  </p>
                </div>
                <div className="w-50" style={{ minWidth: "180px" }}>
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">
                      {listing.bathrooms} Bathrooms
                    </span>
                  </p>
                </div>
                <div className="w-50" style={{ minWidth: "180px" }}>
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">
                      {listing.area} m<sup>2</sup>
                    </span>
                  </p>
                </div>
                <div className="w-50" style={{ minWidth: "180px" }}>
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">2 Garages</span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </Link>
        <div className="w-100 h-40"></div>
        <div className="position-absolute start-0 bottom-0 w-100">
          <div className="w-100 p-3 p-md-4">
            <hr className="bg-gray-500" />
            <div className="d-flex align-item-center justify-content-between">
              <p className="mb-0 fw-bold ls-6">
                Kshs {formatPrice(listing.price)}
                {listing.property_status.indexOf("rent") >= 0 &&
                  listing.property_status.indexOf("sale") < 0 &&
                  ` / ${listing.price_duration}`}
              </p>
              <p className="mb-0 d-flex">
                <span
                  onClick={() =>
                    setSharingInfo(
                      `${location.hostname}${getApartmentPath(
                        listing.property_status,
                        listing.slug
                      )}`,
                      listing.title
                    )
                  }
                  className="d-block cursor-pointer me-4"
                >
                  <i className="bi bi-share"></i>
                </span>
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={listing.likes ? listing.likes.length : 0}
                  onClick={() => setUpdateLikes(true)}
                  className="d-block cursor-pointer"
                >
                  {liked ? (
                    <i className="bi bi-heart-fill text-danger"></i>
                  ) : (
                    <i className="bi bi-heart"></i>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
