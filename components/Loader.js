import React from "react";

export default function Loader() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ marginTop: "150px" }}
    >
      <div
        className="d-flex justify-content-center"
        style={{ width: "100px", height: "100px" }}
      >
        <div className="spinner-border w-100 h-100" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
