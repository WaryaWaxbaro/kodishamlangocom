import Image from "next/image";
import React from "react";
import ReviewStars from "./ReviewStars";
import Link from "next/link";

export default function DashboardReview({ reviews, listings }) {
  console.log("reviews", reviews);
  const firstReviews = reviews.slice(0, 5);

  const getPropertyTitle = (propertyId) => {
    const listing = listings.find((listing) => listing.mId === propertyId);
    return listing.title;
  };

  return (
    <div className="w-100 p-2 p-sm-3 shadow mb-4">
      <h2 className="fs-22 fw-bold ls-6 mb-4">Reviews</h2>
      {firstReviews.length > 0 ? (
        <div className="w-100">
          {firstReviews.map((review) => (
            <div key={review.mId} className="w-100 d-flex mb-3">
              <div className="square-75 bg-info me-4 rounded-circle overflow-hidden">
                <Image
                  src={review.photoUrl}
                  layout="responsive"
                  height={75}
                  width={75}
                />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div>
                    <h2 className="fs-18 fw-normal text-gray-600">
                      {getPropertyTitle(review.propertyId)}
                    </h2>
                    <h3 className="fs-18 fw-normal">{review.name}</h3>
                    <p className="mb-1 fs-14">22 Minutes ago</p>
                  </div>
                  <div>
                    <button className="btn bg-transparent border-none p-0 fs-20 text-primary">
                      <i className="bi bi-eye-fill"></i>
                    </button>
                  </div>
                </div>
                <p className="fs-14">{review.review}</p>
                <ReviewStars rating={review.rating} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No reviews</div>
      )}

      <div className="py-3 text-end">
        <Link href="/admin/reviews">
          <a className="btn btn-primary px-4">
            <span className="d-inline-block me-4">More </span>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </a>
        </Link>
      </div>
    </div>
  );
}
