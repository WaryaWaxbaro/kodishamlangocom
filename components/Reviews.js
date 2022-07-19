import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useUser } from "../context/userContext";
import { ReviewsModel } from "../models";
import { unixToDate } from "../utils";
import HeadingWithLine from "./HeadingWithLine";
import ReviewForm from "./ReviewForm";
import ReviewStars from "./ReviewStars";
import { sortByTimestamp } from "../utils/index";

export default function Reviews({ propertyId, setReviewCount, userId }) {
  const { currentUser } = useUser();
  const [reviews, setReviews] = useState([]);
  const [resetFields, setResetFields] = useState(false);
  const [updateReviews, setUpdateReviews] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      const revs = await new ReviewsModel({
        propertyId: `${propertyId}`,
        isPublished: true,
      }).getAllByQueryDouble(["propertyId", "isPublished"]);
      if (revs && revs.length > 0) {
        const sortedRevs = sortByTimestamp(revs);
        setReviews(sortedRevs);
        setReviewCount(sortedRevs.length);
        setResetFields(!resetFields);
      }
    };

    if (propertyId) {
      getReviews();
    }
  }, [propertyId, updateReviews]);

  const addNewReview = async (data) => {
    if (!data.review) {
      toast.error("Provide all the required fields");
      return;
    }

    if (!currentUser) {
      toast.error("You must be logged in to add review");
      return;
    }

    if (currentUser && currentUser.mId == userId) {
      toast.error("You can't add review for your own property");
      return;
    }

    let rev = {
      ...data,
      name: currentUser.displayName,
      email: currentUser.email,
      userId: `${currentUser.mId}`,
      propertyId: `${propertyId}`,
      photoUrl: `${currentUser.photoURL}`,
      isPublished: false,
    };

    const review = await new ReviewsModel(rev).save();

    if (review?.id) {
      setUpdateReviews(!updateReviews);
    }
  };

  return (
    <div className="w-100 pt-4">
      {reviews.length > 0 && (
        <>
          {reviews.map((review) => (
            <div key={review.mId} className="w-100 d-flex mb-3">
              <div className="position-relative square-75 overflow-hidden rounded-circle cover-img-img me-4">
                {review.photoUrl ? (
                  <Image src={review.photoUrl} layout="fill" />
                ) : (
                  <div className="d-flex align-items-center justify-content-center text-gray-300">
                    <i className="bi bi-user-fill"></i>
                  </div>
                )}
              </div>
              <div className="w-100">
                <div className="w-100 d-flex justify-content-between">
                  <div>
                    <h4 className="fs-16 text-primary">{review.name}</h4>
                    {review.createdAt.seconds ? (
                      <p className="fs-14">
                        {unixToDate(review.createdAt.seconds)}
                      </p>
                    ) : (
                      <p className="fs-14">{review.createdAt}</p>
                    )}
                  </div>
                  <ReviewStars rating={review.rating} />
                </div>
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Review Form */}
      <div className="w-100 mt-3">
        <HeadingWithLine
          text="Add Review"
          classNames="text-dark fs-18 fw-bold ls-6"
        />
        <ReviewForm addNewReview={addNewReview} resetFields={resetFields} />
      </div>
    </div>
  );
}
