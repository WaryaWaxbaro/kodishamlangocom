import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function SmallCard() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="w-100 border border-gray-300 rounded-5 overflow-hidden d-flex flex-column shadow">
      <div className="w-100">
        <Link href="/">
          <a>
            <div className="w-100 h-260 position-relative cover-img-img">
              <Image src="/images/cover/mombasa.png" layout="fill" />
              <div className="position-absolute start-0 top-0 w-100 d-flex justify-content-between">
                <button className="btn btn-primary btn-sm m-2 text-light fs-14">
                  Featured
                </button>
                <button className="btn btn-sm bg-dark bg-opacity-50 m-2 text-light fs-14">
                  For Sale
                </button>
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="featured-card__text position-relative h-100 p-3 p-md-4 bg-white flex-1">
        <Link href="/">
          <a className="text-decoration-none text-dark">
            <div className="w-100">
              <h3 className="fs-16 fw-bold ls-6 mb-2">
                Real Luxury Family House
              </h3>
              <p className="d-flex text-gray-600 mb-3">
                <span className="d-block me-2">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <span className="d-block fs-14 ls-6">
                  <span>Est St, 77 - Central Park South, NYC</span>
                </span>
              </p>
              <div className="mw-lg-80 d-flex justify-content-between flex-wrap">
                <div className="w-50">
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">6 Bedrooms</span>
                  </p>
                </div>
                <div className="w-50">
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">3 Bathrooms</span>
                  </p>
                </div>
                <div className="w-50">
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">
                      720 m<sup>2</sup>
                    </span>
                  </p>
                </div>
                <div className="w-50">
                  <p className="d-flex fs-14 ls-6">
                    <span className="d-block me-2">
                      <i className="bi bi-alarm-fill"></i>
                    </span>
                    <span className="d-block">2 Garages</span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </Link>
        <div className="w-100 h-60"></div>
        <div className="position-absolute start-0 bottom-0 w-100">
          <div className="w-100 px-3 pb-3 px-md-4 pb-md-4">
            <hr className="bg-gray-500" />
            <div className="d-flex align-item-center justify-content-between">
              <p className="mb-0 fw-bold ls-6">Kshs 150,000</p>
              <p className="mb-0 d-flex">
                <span className="d-block cursor-pointer me-4">
                  <i className="bi bi-share"></i>
                </span>
                <span
                  onClick={() => setLiked(!liked)}
                  className="d-block cursor-pointer"
                >
                  {liked ? (
                    <i className="bi bi-heart-fill text-danger"></i>
                  ) : (
                    <i className="bi bi-heart"></i>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
