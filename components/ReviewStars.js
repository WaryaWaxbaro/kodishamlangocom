import React from "react";

export default function ReviewStars(props) {
  let { rating, count } = props;
  // Check if rating is not a number and null
  if (isNaN(rating) || rating === null) {
    // Set rating to 4
    rating = 4;
  }
  return (
    <div className="text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <>
          {i < rating ? (
            <i className="bi bi-star-fill me-1"></i>
          ) : (
            <i className="bi bi-star"></i>
          )}
        </>
      ))}
      {count && (
        <span className="d-inline-block ms-3 text-dark fs-14">
          ({count} reviews)
        </span>
      )}
    </div>
  );
}
