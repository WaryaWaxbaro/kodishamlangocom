import { useState } from "react";

export default function SingleReviewStar({
  rating,
  index,
  setReviewRating,
  tempReviewRating,
  setTempReviewRating,
}) {
  return (
    <>
      <span>
        {index <= rating ? (
          <i
            onClick={() => setReviewRating(index)}
            className="bi bi-star-fill me-2"
          ></i>
        ) : (
          <>
            {index <= tempReviewRating ? (
              <i
                onClick={() => setReviewRating(index)}
                onMouseEnter={() => {
                  setTempReviewRating(index);
                  console.log(index);
                }}
                onMouseLeave={() => {
                  setTempReviewRating(rating);
                  console.log(rating);
                }}
                className="bi bi-star-fill me-2"
              ></i>
            ) : (
              <i
                onClick={() => setReviewRating(index)}
                onMouseEnter={() => {
                  setTempReviewRating(index);
                  console.log(index);
                }}
                onMouseLeave={() => {
                  setTempReviewRating(rating);
                  console.log(rating);
                }}
                className="bi bi-star me-2"
              ></i>
            )}
          </>
        )}
      </span>
    </>
  );
}
