import React from "react";

export default function login() {
  return (
    <div className="max-width-350 mx-auto shadow p-2 p-sm-3 rounded-5 my-5">
      <h1 className="fs-24 text-center mb-3">Login</h1>
      <hr className="bg-dark" />
      <div className="d-grid py-4">
        <button className="btn btn-danger text-light btn-lg d-flex align-items-center justify-content-center mb-4">
          <span className="d-block me-3">
            <i className="bi bi-google"></i>
          </span>
          <span className="d-block">Login with Google</span>
        </button>
        <button className="btn btn-blue text-light btn-lg d-flex align-items-center justify-content-center">
          <span className="d-block me-3">
            <i className="bi bi-facebook"></i>
          </span>
          <span className="d-block">Login with Facebook</span>
        </button>
      </div>
    </div>
  );
}
