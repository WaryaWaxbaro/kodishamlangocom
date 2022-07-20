import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import StorageUploads from "../models/storageUploads";
import { ApartmentModel } from "../models";
import { formatPrice } from "../utils";
import { currency } from "../utils/staticSetup";

export default function SmallCard({
  apartment,
  apartmentType,
  setSharingInfo,
  currentUser,
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(
    apartment.likes?.includes(currentUser?.mId)
  );
  const [updateLikes, setUpdateLikes] = useState(false);

  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const firstRender = useRef(false);

  const slug =
    apartmentType === "rent"
      ? `/for-rent/${apartment.slug}`
      : apartmentType === "sale"
      ? `/for-sale/${apartment.slug}`
      : apartmentType === "holiday"
      ? `/holiday/${apartment.slug}`
      : `/`;

  useEffect(() => {
    setLiked(apartment.likes?.includes(currentUser?.mId));
  }, [currentUser]);

  useEffect(() => {
    const getThumbnailUrl = async (id) => {
      const thumbnail = await new StorageUploads(
        `apartments/thumbnails/${id}`
      ).downloadURL();
      setThumbnailUrl(thumbnail);
    };

    if (apartment.mId) {
      getThumbnailUrl(apartment.mId);
    }
  }, [apartment]);

  useEffect(() => {
    const handleLike = async () => {
      await new ApartmentModel({
        id: apartment.id,
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

  if (!apartment) return null;

  return (
    <div className="w-100 h-100 border border-gray-300 rounded-5 overflow-hidden d-flex flex-column shadow">
      <div className="w-100">
        <Link href={slug}>
          <a>
            <div className="w-100 h-260 position-relative cover-img-img">
              {thumbnailUrl ? (
                <Image src={thumbnailUrl} layout="fill" />
              ) : (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <i className="bi bi-house-fill fs-32"></i>
                </div>
              )}
              <div className="position-absolute start-0 top-0 w-100 d-flex justify-content-between">
                {apartment.featured && (
                  <button className="btn btn-primary btn-sm m-2 text-light fs-14">
                    Featured
                  </button>
                )}
                {apartment.featured && (
                  <button className="btn btn-sm bg-dark bg-opacity-50 m-2 text-light fs-14">
                    Featured
                  </button>
                )}
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="featured-card__text position-relative h-100 p-3 p-md-4 bg-white flex-1">
        <Link href={slug}>
          <a className="text-decoration-none text-dark">
            <div className="w-100">
              <h3 className="fs-16 fw-bold ls-6 mb-2">{apartment.title}</h3>
              <p className="d-flex text-gray-600 mb-3">
                <span className="d-block me-2">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <span className="d-block fs-14 ls-6">
                  <span>
                    {apartment.street}, {apartment.sub_city}, {apartment.city}
                  </span>
                </span>
              </p>
              <div className="mw-lg-80 d-flex justify-content-between flex-wrap">
                <div className="w-50">
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block square-20 me-2">
                      <Image
                        width={20}
                        height="20"
                        src="/icons/double-bed.svg"
                        alt={apartment.city}
                      />
                    </span>
                    <span className="d-block">
                      {apartment.bedrooms} Bedrooms
                    </span>
                  </p>
                </div>
                <div className="w-50">
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block square-20 me-2">
                      <Image
                        width={20}
                        height="20"
                        src="/icons/shower.png"
                        alt={apartment.city}
                      />
                    </span>
                    <span className="d-block">
                      {apartment.bathrooms} Bathrooms
                    </span>
                  </p>
                </div>
                <div className="w-50">
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block square-20 me-2">
                      <Image
                        width={20}
                        height="20"
                        src="/icons/area.svg"
                        alt={apartment.city}
                      />
                    </span>
                    <span className="d-block">
                      {apartment.area} m<sup>2</sup>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </Link>
        <div className="w-100 h-60"></div>
        <div className="position-absolute start-0 bottom-0 w-100">
          <div className="w-100 px-3 pb-3 px-md-4 pb-md-4">
            <hr className="bg-gray-500" />
            <div className="d-flex align-item-center justify-content-between">
              <p className="mb-0 fw-bold ls-6">
                {currency} {formatPrice(apartment.price)}{" "}
                {apartmentType === "rent" && `/ ${apartment.price_duration}`}
              </p>
              <p className="mb-0 d-flex">
                <span
                  onClick={() =>
                    setSharingInfo(
                      `${location.hostname}${slug}`,
                      apartment.title
                    )
                  }
                  className="d-block cursor-pointer me-4"
                >
                  <i className="bi bi-share"></i>
                </span>
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={apartment.likes ? apartment.likes.length : 0}
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
