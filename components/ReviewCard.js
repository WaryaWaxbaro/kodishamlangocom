import { useState, useEffect } from "react";
import Image from "next/image";

import { ReviewsModel } from "../models";
import { unixToDate, getYesterdayDate } from "../utils";
import ReviewStars from "./ReviewStars";

export default function ReviewCard({ propertyId }) {
  const [reviews, setReviews] = useState([]);
  const [todayReviews, setTodayReviews] = useState([]);

  useEffect(() => {
    const getReview = async () => {
      const revs = await new ReviewsModel({ propertyId }).getAllByQuery();
      console.log(revs);
      if (revs.length > 0) {
        const sortedReviews = revs.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds;
        });
        let todayReviews = sortedReviews.filter(
          (review) =>
            new Date(review.createdAt.seconds * 1000).getTime() >
            getYesterdayDate().getTime()
        );
        setReviews(sortedReviews);
        setTodayReviews(todayReviews);
      }
    };
    if (propertyId) {
      getReview();
    }
  }, []);

  const updateReview = async (id, isPublished) => {
    console.log(foundReview);
    const review = await new ReviewsModel({
      id,
      isPublished,
    }).update();
    const updatedReviews = reviews.map((rev) => {
      if (rev.id === id) {
        return { ...rev, isPublished };
      }
      return rev;
    });
    setReviews(updatedReviews);
  };

  if (reviews.length < 1) {
    return null;
  }
  return (
    <div className="w-100">
      <div className="w-100 mb-3">
        <button
          className="btn btn-primary btn-sm rounded-pill px-4 position-relative"
          data-bs-toggle="collapse"
          data-bs-target={`#review-${propertyId}`}
          aria-expanded="false"
          aria-controls={`#review-${propertyId}`}
        >
          View Reviews ({reviews.length})
          {todayReviews.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          )}
        </button>
      </div>
      <div className="collapse" id={`review-${propertyId}`}>
        {reviews.map((review, index) => (
          <div key={review.mId} className="card card-body mb-3">
            <div className="w-100 d-flex mb-3">
              <div className="square-75 bg-info me-4 rounded-circle overflow-hidden">
                <Image
                  src={review.photoUrl}
                  layout="responsive"
                  height={75}
                  width={75}
                />
              </div>
              <div className="w-100">
                <h3 className="fs-18 fw-normal">{review.name}</h3>
                <p className="mb-2 fs-14">{review.review}</p>
                <ReviewStars rating={review.rating} />
                <p className="mb-2 mt-2 fs-14">
                  {unixToDate(review.createdAt.seconds)}
                </p>
                <div className="d-flex align-items-center">
                  <div className="me-4 fs-18">
                    {review.isPublished ? (
                      <div className="text-success">
                        <i className="bi bi-check-circle-fill"></i>
                      </div>
                    ) : (
                      <div className="text-danger">
                        <i className="bi bi-x-circle-fill"></i>
                      </div>
                    )}
                  </div>
                  {review.isPublished ? (
                    <button
                      onClick={() =>
                        updateReview(review.id, !review.isPublished)
                      }
                      className="btn btn-sm btn-danger py-2 rounded-pill px-4 border-none p-0 "
                    >
                      Deny (Hide from others)
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateReview(review.id, !review.isPublished)
                      }
                      className="btn btn-sm btn-success py-2 rounded-pill px-4 border-none p-0 "
                    >
                      Accept (Others will see)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
