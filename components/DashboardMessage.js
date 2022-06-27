import React from "react";
import Link from "next/link";

export default function DashboardMessage({ contactRequests }) {
  return (
    <div className="w-100 p-2 p-sm-3 shadow mb-4">
      <h2 className="fs-22 fw-bold ls-6 mb-4">Contact Requests</h2>
      {contactRequests.length > 0 ? (
        <div>
          {contactRequests.map((contactRequest, index) => (
            <div key={index} className="w-100 d-flex mb-3">
              <div className="square-75 d-flex align-items-center justify-content-center bg-info me-4 rounded-circle">
                {index + 1}
              </div>
              <div>
                <h3 className="fs-18 fw-normal">{contactRequest.name}</h3>
                <p className="mb-1 fs-14">22 Minutes ago</p>
                <p className="fs-14">{contactRequest.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No contact requests</div>
      )}
      <div className="py-3 text-end">
        <Link href="/admin/contact-requests">
          <a className="btn btn-primary px-4">
            <span className="d-inline-block me-4">More </span>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </a>
        </Link>
      </div>
    </div>
  );
}
