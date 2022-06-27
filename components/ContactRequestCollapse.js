import React from "react";
import { unixToDate } from "../utils";

export default function ContactRequestCollapse({ contactRequest }) {
  return (
    <div className="w-100">
      <div className="w-100 mb-3">
        <button
          className="btn btn-primary btn-sm rounded-pill px-4"
          data-bs-toggle="collapse"
          data-bs-target={`#contactRequest-${contactRequest.mId}`}
          aria-expanded="false"
          aria-controls={`#contactRequest-${contactRequest.mId}`}
        >
          View Contact Requests
        </button>
      </div>
      <div className="collapse" id={`contactRequest-${contactRequest.mId}`}>
        <div className="card card-body mb-3">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{contactRequest.name}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{contactRequest.phone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{contactRequest.email}</td>
              </tr>
              <tr>
                <th>Message</th>
                <td>{contactRequest.message}</td>
              </tr>
              <tr>
                <th>Sent At</th>
                <td>{unixToDate(contactRequest.createdAt.seconds)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
