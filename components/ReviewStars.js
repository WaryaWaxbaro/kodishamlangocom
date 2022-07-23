import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ReviewStars(props) {
  const t = useTranslations("Reviews");
  let { rating, count } = props;
  let [selectReview, setSelectReview] = useState(false);
  // Check if rating is not a number and null
  if (isNaN(rating) || rating === null) {
    // Set rating to 4
    rating = 0;
  }

  if (count === 0) {
    return null;
  }

  return (
    <div className="text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>
          {i < rating ? (
            <i className="bi bi-star-fill me-1"></i>
          ) : (
            <i className="bi bi-star me-1"></i>
          )}
        </span>
      ))}
      {count && (
        <span className="d-inline-block ms-3 text-dark fs-14">
          ({count} {t("reviews")})
        </span>
      )}
    </div>
  );
}
