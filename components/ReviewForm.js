import React from "react";

export default function ReviewForm() {
  return (
    <div className="w-100 mt-3">
      <p className="mb-1">Your rating for this listing</p>
      <div className="d-flex text-primary">
        <div className="me-1">
          <i className="bi bi-star-fill"></i>
        </div>
        <div className="me-1">
          <i className="bi bi-star-fill"></i>
        </div>
        <div className="me-1">
          <i className="bi bi-star-fill"></i>
        </div>
        <div className="me-1">
          <i className="bi bi-star"></i>
        </div>
        <div className="me-1">
          <i className="bi bi-star"></i>
        </div>
      </div>
      <div className="w-100 my-4">
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="First Name"
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Review"
              id="review"
              style={{ height: "120px" }}
            ></textarea>
            <label htmlFor="review">Review</label>
          </div>
          <div>
            <button className="btn btn-primary text-light fs-14">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
