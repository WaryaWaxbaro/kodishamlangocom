import { useState, useEffect } from "react";
import SingleReviewStar from "./SingleReviewStar";
import { useTranslations } from "next-intl";

const reviewData = {
  rating: 1,
  review: "",
};

export default function ReviewForm({ addNewReview, resetFields }) {
  const t = useTranslations("ReviewForm");

  const [newReview, setNewReview] = useState(reviewData);
  const [reviewRating, setReviewRating] = useState(1);
  const [tempReviewRating, setTempReviewRating] = useState(1);
  const [updateReviewRating, setUpdateReviewRating] = useState(false);

  useEffect(() => {
    if (updateReviewRating) {
      setNewReview({
        ...newReview,
        rating: reviewRating,
      });
      setUpdateReviewRating(false);
      setTempReviewRating(reviewRating);
    }
  }, [updateReviewRating]);

  useEffect(() => {
    if (resetFields) {
      //setNewReview(reviewData);
      //setReviewRating(1);
      //setTempReviewRating(1);
    }
  }, [resetFields]);

  useEffect(() => {
    setUpdateReviewRating(true);
  }, [reviewRating]);

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewReview({ ...newReview });
    setNewReview(reviewData);
    setReviewRating(1);
    setTempReviewRating(1);
  };
  return (
    <div className="w-100 mt-3">
      <p className="mb-1">{t("title")}</p>
      <div className="d-flex text-primary fs-28">
        {[1, 2, 3, 4, 5].map((i) => (
          <SingleReviewStar
            key={i}
            rating={newReview.rating}
            index={i}
            setReviewRating={setReviewRating}
            tempReviewRating={tempReviewRating}
            setTempReviewRating={setTempReviewRating}
          />
        ))}
      </div>
      <div className="w-100 my-4">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Review"
              id="review"
              style={{ height: "120px" }}
              name="review"
              value={newReview.review}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="review">{t("review")}</label>
          </div>
          <div>
            <button className="btn btn-primary text-light fs-14">
              {t("submit_review")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
