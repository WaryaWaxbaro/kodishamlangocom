import React from "react";

export default function ContactRequestForm() {
  return (
    <div className="w-100 mt-3">
      <form>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="full_name"
            placeholder="Full Name"
          />
          <label htmlFor="full_name">Full Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Phone Number"
          />
          <label htmlFor="phone">Phone Number</label>
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
            placeholder="Message"
            id="message"
            style={{ height: "120px" }}
          ></textarea>
          <label htmlFor="message">Message</label>
        </div>
        <div className="d-grid">
          <button className="btn btn-primary text-light fs-18 rounded-0">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
