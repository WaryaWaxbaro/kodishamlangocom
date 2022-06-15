import React from "react";
import SharingLinks from "./SharingLinks";

export default function SharingModal({ sharingInfo }) {
  return (
    <div
      className="modal fade"
      id="sharingLinksModal"
      tabIndex="-1"
      aria-labelledby="sharingLinksModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="sharingLinksModalLabel">
              Share
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <SharingLinks sharingInfo={sharingInfo} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger rounded-0 btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
