import Image from "next/image";
import React from "react";
import HeadingWithLine from "../components/HeadingWithLine";
import ImageSlider from "../components/ImageSlider";
import Reviews from "../components/Reviews";
import ReviewForm from "../components/ReviewForm";

export default function singleListing() {
  return (
    <div className="container-lg py-5">
      <div className="row">
        <div className="col-12 col-md-8 mb-3">
          {/* main heading */}
          <div className="w-100 d-flex flex-column flex-sm-row justify-content-sm-between">
            <div>
              <div className="d-flex">
                <h1 className="fs-28 fw-bold">
                  Luxury Villa House{" "}
                  <span className="badge bg-primary ms-3 rounded-pill fs-14 fw-normal">
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
            <p className="fs-28 fw-bold text-primary ls-6">Kshs 230,000</p>
          </div>
          {/* Gallery */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Gallery"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ImageSlider />
          </div>
          {/* Description */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Description"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
              rerum beatae consequatur, totam fugit, alias fuga aliquam quod
              tempora a nisi esse magnam nulla quas! Error praesentium, vero
              dolorum laborum. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Cum rerum beatae consequatur, totam fugit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
              rerum beatae consequatur, totam fugit, alias fuga aliquam quod
              tempora a nisi esse magnam nulla quas! Error praesentium, vero
              dolorum laborum. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Cum rerum beatae consequatur, totam fugit.
            </p>
          </div>
          {/* Property Details */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Property Details"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ul className="list-unstyled d-flex justify-content-between flex-wrap">
              <li className="w-columns-30 mb-3">
                <span>Property ID: </span>
                <span>V254680</span>
              </li>
              <li className="w-columns-30 mb-3">
                <span>Property Type: </span>
                <span>House</span>
              </li>
              <li className="w-columns-30 mb-3">
                <span>Property status: </span>
                <span>For Sale</span>
              </li>
            </ul>
            <HeadingWithLine
              text="Amenities"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ul className="list-unstyled d-flex justify-content-between flex-wrap">
              <li className="w-columns-30 mb-3">
                <span className="d-inline-block me-2">
                  <i className="bi bi-check-square-fill text-primary"></i>
                </span>
                <span>AC</span>
              </li>
              <li className="w-columns-30 mb-3">
                <span className="d-inline-block me-2">
                  <i className="bi bi-check-square-fill text-primary"></i>
                </span>
                <span>Balcony</span>
              </li>
              <li className="w-columns-30 mb-3">
                <span className="d-inline-block me-2">
                  <i className="bi bi-check-square-fill text-primary"></i>
                </span>
                <span>Internet</span>
              </li>
            </ul>
          </div>
          {/* Floor Plans */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Floor Plans"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <div className="w-100 position-relative">
              <Image
                src="/images/cover/floor-plan-1.png"
                layout="responsive"
                width={450}
                height={250}
              />
            </div>
          </div>
          {/* Reviews */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="3 Reviews"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <Reviews />
          </div>
          {/* Review Form */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Add Review"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ReviewForm />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="w-100 bg-primary" style={{ height: "400px" }}></div>
        </div>
      </div>
    </div>
  );
}
