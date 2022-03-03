import Image from "next/image";
import { formatPrice } from "../utils";
import { useRouter } from "next/router";

import Link from "next/link";

export default function ApartmentInfoCard(props) {
  let { apartment, apartment_url } = props;

  const router = useRouter();
  const handleRouting = () => {
    router.push(`/houses-for-rent/${apartment.slug}`);
  };
  return (
    <div className="card h-100 shadow">
      <div className="height-240 position-relative">
        <div
          id={`carouselCardControls${apartment.id}`}
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item height-240 active bg-primary bg-opacity-25">
              <div className="w-100 h-100 position-relative">
                <Image src="/images/sun_sky.jpeg" layout="fill" />
                <div className="position-absolute start-0 top-0 w-100 h-100 bg-primary bg-opacity-75 d-flex align-items-center justify-content-center">
                  <h4 className="fs-20 text-center max-width-280 text-white text-uppercase">
                    <span className="d-block">Pictures</span>
                    <span className="d-block">coming</span>
                    <span className="d-block">soon</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carouselCardControls${apartment.id}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carouselCardControls${apartment.id}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <button
          className="position-absolute square-35 btn bg-light border-0 rounded-circle d-flex align-items-center justify-content-center p-2"
          style={{ left: "16px", top: "16px" }}
        >
          <i className="bi bi-heart-fill text-danger"></i>
        </button>
        {apartment.badge && (
          <button
            className="position-absolute btn btn-info py-2 px-3 rounded-pill m-0 text-uppercase fs-14 text-light translate-y-to-50 border-0 no-shadow-btn shadow-sm"
            style={{ bottom: 0, left: "16px" }}
          >
            {apartment.badge}
          </button>
        )}
      </div>
      <div className="card-body">
        <h3 className="fs-14 fw-light text-black-50 d-flex align-items-center mt-3 mb-2">
          <span className="square-15 d-block me-2">
            <i className="bi bi-geo-alt"></i>
          </span>
          <span className="d-block mt-1">
            {apartment.location}, {apartment.city}
          </span>
        </h3>
        <h4 className="fs-22 fw-normal ls-6 mb-3">
          {apartment.apartment_name}{" "}
        </h4>
        <ul className="list-unstyled">
          <li className="d-flex align-items-center mb-2">
            <span className="d-block square-20 me-2">
              <Image
                width={20}
                height="20"
                src="/icons/double-bed.svg"
                alt={apartment.city}
              />
            </span>
            <p className="mb-0 mt-1">{apartment.bedroom} Bedrooms</p>
          </li>
          {apartment.guest && (
            <li className="d-flex align-items-center mb-2">
              <span className="d-block square-20 me-2">
                <Image
                  width={20}
                  height="20"
                  src="/icons/guest.svg"
                  alt={apartment.city}
                />
              </span>
              <p className="mb-0 mt-1">{apartment.guest} Guests</p>
            </li>
          )}

          <li className="d-flex align-items-center mb-2">
            <span className="d-block square-20 me-2">
              <Image
                width={20}
                height="20"
                src="/icons/area.svg"
                alt={apartment.city}
              />
            </span>
            <p className="mb-0 mt-1">
              Area {apartment.area}m<sup>2</sup>
            </p>
          </li>
        </ul>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="mb-0 text-black">
              <span className="fs-30">{formatPrice(apartment.price)} </span>
              <span className="fs-14 text-capitalize">
                Kshs / {apartment.price_duration}
              </span>
            </h5>
          </div>
          <Link href={`/houses-for-rent/${apartment.slug}`}>
            <span className="btn btn-primary rounded-circle ls-6 fs-16 square-50 d-flex align-items-center justify-content-center shadow-sm">
              <span className="d-block">
                <i className="bi bi-chevron-right"></i>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
