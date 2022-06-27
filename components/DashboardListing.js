import { useState } from "react";
import Link from "next/link";

import { formatPrice, unixToDate } from "../utils";

export default function DashboardListing({ listings }) {
  const apartments = listings.slice(0, 5);
  return (
    <div className="w-100 p-2 p-sm-3 shadow mb-4">
      <h2 className="fs-22 fw-bold ls-6 mb-4">Properties</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Listing Title</th>
              <th scope="col">Price</th>
              <th scope="col">Added Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((listing) => (
              <tr key={listing.mId}>
                <td>{listing.title}</td>
                <td>{formatPrice(listing.price)}</td>
                <td>{unixToDate(listing.updatedAt.seconds)}</td>
                <td>{listing.published ? "Published" : "Not published"}</td>
                <td className="text-danger">
                  <Link href={`/admin/my-properties/${listing.mId}`}>
                    <a>
                      <i className="bi bi-pencil-square"></i>
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-3 text-end">
        <Link href="/admin/my-properties">
          <a className="btn btn-primary px-4">
            <span className="d-inline-block me-4">More </span>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </a>
        </Link>
      </div>
    </div>
  );
}
