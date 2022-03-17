import React from "react";
import NewListingForm from "../components/NewListingForm";

export default function newListing() {
  return (
    <div className="container-lg py-5">
      <h1 className="fs-28 mb-3">Add New Property Listing</h1>
      <p className="mb-1">
        Provide accurate information to market your property
      </p>
      <p>
        Fields marked with <span className="text-primary">*</span> are
        compulsary
      </p>
      <div className="w-100">
        <NewListingForm />
      </div>
    </div>
  );
}
