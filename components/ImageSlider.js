import Image from "next/image";
import React from "react";

export default function ImageSlider() {
  return (
    <>
      <div
        id="SingleListingCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators justify-content-start mx-0 mb-0 img-slider-thumbnail-container">
          <div
            className="me-2 border-0 ms-0 active img-slider-thumbnail"
            type="button"
            data-bs-target="#SingleListingCarousel"
            data-bs-slide-to="0"
            aria-current="true"
            aria-label="Slide 1"
          >
            <div className="w-100 h-100 position-relative cover-img-img">
              <Image src="/images/cover/mombasa.png" layout="fill" />
            </div>
          </div>
          <div
            className="me-2 border-0 ms-0 img-slider-thumbnail"
            type="button"
            data-bs-target="#SingleListingCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          >
            <div className="w-100 h-100 position-relative cover-img-img">
              <Image src="/images/cover/nairobi.png" layout="fill" />
            </div>
          </div>
          <div
            className="me-2 border-0 ms-0 img-slider-thumbnail"
            type="button"
            data-bs-target="#SingleListingCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          >
            <div className="w-100 h-100 position-relative cover-img-img">
              <Image src="/images/cover/mombasa.png" layout="fill" />
            </div>
          </div>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="w-100">
              <Image
                src="/images/cover/mombasa.png"
                layout="responsive"
                height={450}
                width={450}
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-100">
              <Image
                src="/images/cover/nairobi.png"
                layout="responsive"
                height={450}
                width={450}
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className="w-100">
              <Image
                src="/images/cover/mombasa.png"
                layout="responsive"
                height={450}
                width={450}
              />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev opacity-100"
          type="button"
          data-bs-target="#SingleListingCarousel"
          data-bs-slide="prev"
        >
          <span className="square-35 d-block bg-primary bg-opacity-50 rounded-pill d-flex align-items-center justify-content-center">
            <span className="d-block">
              <i className="bi bi-chevron-left text-white"></i>
            </span>
          </span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next opacity-100"
          type="button"
          data-bs-target="#SingleListingCarousel"
          data-bs-slide="next"
        >
          <span className="square-35 d-block bg-primary bg-opacity-75 rounded-pill d-flex align-items-center justify-content-center">
            <span className="d-block">
              <i className="bi bi-chevron-right text-white"></i>
            </span>
          </span>
          <span className="visually-hidden">Next</span>
        </button>

        <div className="w-100 img-slider-thumbnail-container mt-3"></div>
      </div>
    </>
  );
}
