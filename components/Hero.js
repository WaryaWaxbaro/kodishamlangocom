import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import AppDropdown from "./AppDropdown";
import AppSlider from "./AppSlider";

export default function Hero() {
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedBathrooms, setSelectedBathrooms] = useState("");

  return (
    <>
      <div className="position-fixed start-0 top-0 w-100 h-90-vh z-1">
        <div className="position-relative w-100 h-100 cover-img-bottom">
          <Image src="/bg-img.jpeg" layout="fill" alt="Kodishamlango.com" />
          <div className="position-absolute start-0 top-0 w-100 h-100 hero-bg"></div>
        </div>
      </div>
      <header className="w- 100 h-80-vh d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="max-width-lg-80p mx-auto">
            <div className="text-center">
              <h1 className="fs-36 text-capitalize fw-bold lh-12 text-light d-flex justify-content-center">
                <span className="d-block me-2">Find </span>
                <span className="typewriter-container">
                  <Typewriter
                    options={{
                      strings: [
                        "Apartments",
                        "Homes For Sale",
                        "Homes For Rent",
                        "Holiday Apartments",
                        "Plots",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 120,
                      deleteSpeed: 120,
                    }}
                  />
                </span>
              </h1>
              <p className="text-light">
                Find Apartments and Homes For Rent, For Holiday, For Sale and
                Plots.
              </p>
            </div>
            <div className="w-100">
              <div className="w-100 text-center mt-4 mb-3">
                {apartLinks.map((ap, index) => (
                  <Link key={ap.name} href={ap.url}>
                    <a className="btn btn-light rounded-5 fs-14 min-w-96 me-3 mb-2">
                      {ap.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="position-relative w-100 rounded-10 border border-5 border-bg-light bg-light py-3 px-2">
                <div className="row">
                  <div className="col-12 col-md-3 mb-2">
                    <input
                      className="form-control h-100 bg-light fs-14 border-gray-200 p-2 rounded-5 outline-none no-shadow"
                      type="text"
                      name="keyword"
                      placeholder="Location"
                    />
                  </div>
                  <div className="col-12 col-md-3 mb-2">
                    <AppDropdown
                      defaultItem="Property Type"
                      zIndex={100}
                      mainListItem={["Family House", "Apartment", "Bangalow"]}
                      setSelectedListItem={setSelectedPropertyType}
                    />
                  </div>
                  <div className="col-12 col-md-3 mb-2">
                    <div className="w-100 h-100">
                      <button className="w-100 h-100 btn fs-14 bg-light rounded-5 border-gray-200 ouline-none d-flex align-items-center justify-content-between p-2">
                        <span className="d-block">Advanced Search</span>
                        <span className="d-block text-primary fs-16">
                          <i className="bi bi-three-dots-vertical"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mb-2">
                    <div className="w-100 h-100">
                      <button className="w-100 h-100 btn btn-primary text-light fs-14 rounded-5 ouline-none p-2">
                        Search Now
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="position-absolute top-100 start-0 w-100 bg-light p-2 mt-1 "
                  style={{ zIndex: 80 }}
                >
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 mb-2">
                      <AppDropdown
                        defaultItem="Property Status"
                        zIndex={100}
                        mainListItem={["For Sale", "For Rent"]}
                        icon="<i class='bi bi-house-fill text-primary'></i>"
                        setSelectedListItem={setSelectedPropertyStatus}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-2">
                      <AppDropdown
                        defaultItem="Bedrooms"
                        zIndex={100}
                        mainListItem={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        icon="<i class='bi bi-house-fill text-primary'></i>"
                        setSelectedListItem={setSelectedBedrooms}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-2">
                      <AppDropdown
                        defaultItem="Bathrooms"
                        zIndex={100}
                        mainListItem={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        icon="<i class='bi bi-house-fill text-primary'></i>"
                        setSelectedListItem={setSelectedBedrooms}
                      />
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-6 mb-2">
                          <div className="my-3">
                            <AppSlider
                              minMax={[0, 110000]}
                              labelName="Area Size"
                              unit="m"
                            />
                          </div>
                          <div className="my-3">
                            <AppSlider
                              minMax={[0, 110000]}
                              labelName="Price Range"
                              unit="Kshs"
                              formatUnit={true}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                          <div className="w-100 py-md-5 ps-md-4">
                            <div className="row">
                              {facilities.map((facility) => (
                                <div key={facility} className="col-12 col-sm-6">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={facility}
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      className="form-check-label fs-14"
                                      for="flexCheckDefault"
                                    >
                                      {facility}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

const apartLinks = [
  {
    name: "For Sale",
    url: "/",
  },
  {
    name: "For Rent",
    url: "/",
  },
  ,
  {
    name: "For Holiday",
    url: "/",
  },
  {
    name: "Plots",
    url: "/",
  },
];

const facilities = [
  "AC",
  "Fan",
  "Swimming Pool",
  "Central Heating",
  "Laundry Room",
  "Gym",
  "Alarm",
  "Window Covering",
  "WiFi",
  "TV",
  "Dryer",
  "Microwave",
  "Washer",
  "Refrigerator",
  "Outdoor Shower",
  "Parking",
  "Lift",
  "Balcony",
  "Fully Furnished",
  "Play Ground",
  "Breakfast",
  "Arrival Pickup",
  "Departure Pickup",
];
