import React from "react";
import { unixToDate } from "../utils";
import ReviewStars from "./ReviewStars";

export default function MainApartmentReviews({ getUserName, review }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="pe-3">Reviewer</td>
            <td>{review.name}</td>
          </tr>
          <tr>
            <td className="pe-3">Public</td>
            <td>{review.isPublished ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="pe-3">Rating</td>
            <td>
              <ReviewStars rating={review.rating} />
            </td>
          </tr>
          <tr>
            <td className="pe-3">Reviews</td>
            <td>{review.review}</td>
          </tr>
          <tr>
            <td className="pe-3">Sent At</td>
            <td>{unixToDate(review.createdAt.seconds)}</td>
          </tr>
          <tr>
            <td colSpan={5}>
              <hr className="my-2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
