import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { unixToDate, getApartmentPath } from "../utils";
import ReviewStars from "./ReviewStars";
import { ReviewsModel } from "../models";

export default function FavoritePropertiesRow({
  apartment,
  currentUser,
  getThumbnail,
}) {
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const getReviews = async () => {
      const revs = await new ReviewsModel({
        propertyId: `${apartment.mId}`,
      }).getAllByQuery();
      console.log(revs);
      if (revs && revs.length > 0) {
        const avgReviews =
          revs.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.rating;
          }, 0) / revs.length;
        setReviewsCount(revs.length);
        setAverageRating(Math.round(avgReviews));
      }
    };

    if (apartment.mId) {
      getReviews();
    }
  }, [apartment]);
  return (
    <tr key={apartment.mId}>
      <td className="py-3">
        <div className="d-flex align-items-center">
          <div className="me-3 me-lg-4">
            <div
              className="position-relative cover-img-img rounded-5 overflow-hidden"
              style={{ width: "130px", height: "100px" }}
            >
              {getThumbnail(apartment.mId) && (
                <Image
                  src={getThumbnail(apartment.mId)["imageUrl"]}
                  layout="fill"
                />
              )}
            </div>
          </div>
          <div className="min-width-350">
            <h2 className="fs-16 ls-6">{apartment.title}</h2>
            <p className="fs-12 ls-6">
              {apartment.street}, {apartment.sub_city}, {apartment.city}
            </p>

            {reviewsCount > 0 && (
              <ReviewStars rating={averageRating} count={reviewsCount} />
            )}
          </div>
        </div>
      </td>
      <td className="py-3">{unixToDate(apartment.createdAt.seconds)}</td>
      <td className="py-3">{apartment.views}</td>
      <td className="py-3">
        <Link
          href={`${getApartmentPath(
            apartment.property_status,
            apartment.slug
          )}`}
        >
          <a className="btn btn-primary text-blue bg-transparent border-0 p-0">
            <i className="bi bi-eye"></i>
          </a>
        </Link>
      </td>
      <td className="py-3">
        {apartment.likes.indexOf(currentUser.mId) >= 0 && (
          <button
            data-bs-toggle="tooltip"
            title="unlike"
            onClick={() => removeLike(apartment.id, currentUser.mId)}
            className="btn btn-primary text-danger bg-transparent border-0 p-0"
          >
            <i className="bi bi-heart-fill"></i>
          </button>
        )}
      </td>
    </tr>
  );
}
