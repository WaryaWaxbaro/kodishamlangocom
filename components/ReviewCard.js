import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ReviewsModel } from "../models";
import { unixToDate, getYesterdayDate } from "../utils";
import ReviewStars from "./ReviewStars";
import { sortByTimestamp } from "../utils/index";

export default function ReviewCard({ propertyId }) {
  const t = useTranslations("Reviews");
  const [reviews, setReviews] = useState([]);
  const [todayReviews, setTodayReviews] = useState([]);

  useEffect(() => {
    const getReview = async () => {
      const revs = await new ReviewsModel({ propertyId }).getAllByQuery();
      if (revs.length > 0) {
        const sortedReviews = sortByTimestamp(revs);
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
    return (
      <p className="fs-12 text-info">
        {t("no_reviews")} ({reviews.length})
      </p>
    );
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
          {t("view_reviews")} ({reviews.length})
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
                      {t("not_show_to_others")}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateReview(review.id, !review.isPublished)
                      }
                      className="btn btn-sm btn-success py-2 rounded-pill px-4 border-none p-0 "
                    >
                      {t("show_to_others")}
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
