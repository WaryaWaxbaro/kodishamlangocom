import React from "react";
import HeadingWithLine from "../components/HeadingWithLine";
import ImageSlider from "../components/ImageSlider";

export default function singleListing() {
  return (
    <div className="container-lg py-5">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="w-100 d-flex flex-column flex-sm-row justify-content-sm-between">
            <div>
              <div className="d-flex">
                <h1 className="fs-28 fw-bold">
                  Luxury Villa House{" "}
                  <span className="badge bg-primary ms-3 rounded-pill fs-16 fw-normal">
                    For Sale
                  </span>
                </h1>
              </div>
              <p>
                <span className="d-inline-block me-2">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <span>77 - Central Park South, NYC</span>
              </p>
            </div>
            <p className="fs-28 fw-bold text-primary">Kshs 230,000</p>
          </div>
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Gallery"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ImageSlider />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="w-100 bg-primary" style={{ height: "400px" }}></div>
        </div>
      </div>
    </div>
  );
}
