import React from "react";
import { property_types, property_features, removeWhiteSpace } from "../utils";

export default function NewListingForm() {
  return (
    <div className="w-100 p-2 p-sm-4 shadow">
      <form>
        <h3 className="fs-16 fw-bold text-primary mb-3">Property Details</h3>
        <div className="mb-3">
          <label htmlFor="property_title" className="form-label">
            Property Title <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="property_title"
            placeholder="Luxury Villa House"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="propery_description" className="form-label">
            Property Description <span className="text-primary">*</span>
          </label>
          <textarea
            className="form-control"
            id="propery_description"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Property Status <span className="text-primary">*</span>
          </label>
          <div className="form-check me-5">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="sale"
            />
            <label className="form-check-label" htmlFor="sale">
              Sale
            </label>
          </div>
          <div className="form-check me-5">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="rent"
            />
            <label className="form-check-label" htmlFor="rent">
              Rent
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="short_stay"
            />
            <label className="form-check-label" htmlFor="short_stay">
              Short Stay
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="property_type" className="form-label">
                Property Type <span className="text-primary">*</span>
              </label>
              <select
                className="form-select"
                id="property_type"
                aria-label="Property Type"
              >
                {property_types.map((property, index) => (
                  <option key={property}>{property}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="bedrooms" className="form-label">
                Bedrooms <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={100}
                className="form-control"
                id="bedrooms"
                placeholder="3"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="bathroom" className="form-label">
                Bathrooms
              </label>
              <input
                type="number"
                min={1}
                max={20}
                className="form-control"
                id="bathroom"
                placeholder="4"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="area" className="form-label">
                Area{" "}
                <span className="text-primary">
                  m<sup>2</sup>
                </span>
              </label>
              <input
                type="number"
                min={1}
                className="form-control"
                id="area"
                placeholder="120"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="guest" className="form-label">
                Guests
              </label>
              <input
                type="number"
                min={1}
                className="form-control"
                id="guest"
                placeholder="5"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                min={1}
                className="form-control"
                id="price"
                placeholder="100000"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="property_type" className="form-label">
                Price Duration
              </label>
              <select
                className="form-select"
                id="property_type"
                aria-label="Property Type"
              >
                {["Month", "Week", "Day", "Night", ""].map(
                  (property, index) => (
                    <option key={`${property}_${index}`}>{property}</option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <label className="form-label">
              Publish (Visible to others) / Reserved
            </label>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="form-check me-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="reserved"
                />
                <label className="form-check-label" htmlFor="reserved">
                  Reserved
                </label>
              </div>
              <div className="form-check me-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="is_published"
                />
                <label className="form-check-label" htmlFor="is_published">
                  Publish
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">Property Features</h3>
        <div className="row">
          {property_features.map((feature) => (
            <div key={feature} className="col-sm-12 col-md-6 col-lg-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={feature}
                  id={removeWhiteSpace(feature)}
                />
                <label
                  className="form-check-label"
                  htmlFor={removeWhiteSpace(feature)}
                >
                  {feature}
                </label>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">Property Location</h3>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="street" className="form-label">
                Street <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                placeholder="Isgoyska dabka"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="postcode" className="form-label">
                Postcode
              </label>
              <input
                type="number"
                min={1}
                className="form-control"
                id="postcode"
                placeholder="9400"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="sub_city" className="form-label">
                Sub City <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="sub_city"
                placeholder="Celasha Biyaha"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Mogadishu"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="province" className="form-label">
                Province
              </label>
              <input
                type="text"
                className="form-control"
                id="province"
                placeholder="Banadir"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="Somalia"
              />
            </div>
          </div>
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">Contact Information</h3>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="firstname.lastname@example.com"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone <span className="text-primary">*</span>
              </label>
              <input
                type="phone"
                className="form-control"
                id="phone"
                placeholder="016242387"
              />
            </div>
          </div>
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">Property pictures</h3>
        <div className="w-100">
          <input
            class="form-control d-none"
            type="file"
            multiple
            id="pictures"
          />
          <div className="w-100 d-flex mb-4">
            <div
              className="bg-warning me-3"
              style={{ width: "96px", height: "64px" }}
            ></div>
            <div
              className="bg-warning me-3"
              style={{ width: "96px", height: "64px" }}
            ></div>
          </div>
          <div
            className="w-100 h-72 d-flex align-items-center justify-content-center cursor-pointer"
            style={{ border: "1px dashed green" }}
          >
            <div>
              <i className="bi bi-cloud-arrow-up-fill text-success fs-44"></i>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
