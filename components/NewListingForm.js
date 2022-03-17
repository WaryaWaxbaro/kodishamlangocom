import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import {
  property_types,
  property_features,
  removeWhiteSpace,
  toUnderscoreKey,
} from "../utils";

const fieldValues = {
  property_title: "",
  propery_description: "",
  property_status_sale: false,
  property_status_rent: false,
  property_status_short_stay: false,
  property_type: "",
  bedrooms: "",
  bathroom: "",
  area: "",
  guest: "",
  price: "",
  price_duration: "",
  reserved: false,
  published: false,
  street: "",
  postcode: "",
  sub_city: "",
  city: "",
  province: "",
  country: "",
  name: "",
  email: "",
  phone: "",
};
const property_features_keys = property_features.map((feature) => {
  let k = toUnderscoreKey(feature);
  fieldValues[k] = false;
  return k;
});

export default function NewListingForm(props) {
  const { formFieldValues } = props;
  const fileField = useRef(null);
  const toastItem = useRef(null);
  const [formFields, setFormFields] = useState(formFieldValues || fieldValues);
  const [propertyImages, setPropertyImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [maxUploads, setMaxUploads] = useState(0);

  const handleChange = (e) => {
    console.log(e.target.type);
    setFormFields({
      ...formFields,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleOpenFileDialog = () => {
    fileField.current.click();
  };

  useEffect(() => {
    setUploadMessage("");
    console.log("triggered");
    let files = uploadedFiles;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let is_uploaded = propertyImages.find((img) => img.name === file.name);
        if (is_uploaded) {
          setUploadMessage(
            `File (${is_uploaded.name}) has been already uploaded.`
          );
        } else {
          if (maxUploads + propertyImages.length > 5) {
            setUploadMessage("Uploaded maximum photos allowed.");
            return;
          } else {
            setPropertyImages([file, ...propertyImages]);
            console.log("property Images", propertyImages);
          }
        }
      }
    }
  }, [uploadedFiles]);

  const handleImageUpload = (event) => {
    setUploadedFiles(event.target.files);
  };

  const fileListItems = (files) => {
    let b = new ClipboardEvent("").clipboardData || new DataTransfer();
    for (let i = 0, len = files.length; i < len; i++) b.items.add(files[i]);
    return b.files;
  };

  const getFileUrl = (file) => {
    let url = URL.createObjectURL(file);
    return url;
  };
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
            name="property_title"
            value={formFields.property_title}
            onChange={handleChange}
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
            name="propery_description"
            value={formFields.propery_description}
            onChange={handleChange}
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
              name="property_status_sale"
              onChange={handleChange}
              value={formFields.property_status_sale}
              checked={formFields.property_status_sale}
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
              name="property_status_rent"
              onChange={handleChange}
              value={formFields.property_status_rent}
              checked={formFields.property_status_rent}
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
              name="property_status_short_stay"
              onChange={handleChange}
              value={formFields.property_status_short_stay}
              checked={formFields.property_status_short_stay}
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
                name="propery_type"
                value={formFields.property_type}
                onChange={handleChange}
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
                name="bedrooms"
                value={formFields.bedrooms}
                onChange={handleChange}
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
                name="bathroom"
                value={formFields.bathroom}
                onChange={handleChange}
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
                name="area"
                value={formFields.area}
                onChange={handleChange}
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
                name="guest"
                value={formFields.guest}
                onChange={handleChange}
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
                name="price"
                value={formFields.price}
                onChange={handleChange}
                placeholder="100000"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="price_duration" className="form-label">
                Price Duration
              </label>
              <select
                className="form-select"
                id="price_duration"
                name="price_duration"
                value={formFields.price_duration}
                onChange={handleChange}
                aria-label="Price Duration"
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
                  id="reserved"
                  name="reserved"
                  value={formFields.reserved}
                  checked={formFields.reserved}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="reserved">
                  Reserved
                </label>
              </div>
              <div className="form-check me-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="is_published"
                  name="published"
                  value={formFields.published}
                  checked={formFields.published}
                  onChange={handleChange}
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
          {property_features_keys.map((key, index) => (
            <div key={key} className="col-sm-12 col-md-6 col-lg-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={formFields[key]}
                  value={formFields[key]}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={key}>
                  {property_features[index]}
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
                name="street"
                value={formFields.street}
                onChange={handleChange}
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
                name="postcode"
                value={formFields.postcode}
                onChange={handleChange}
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
                name="sub_city"
                value={formFields.sub_city}
                onChange={handleChange}
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
                name="city"
                value={formFields.city}
                onChange={handleChange}
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
                name="province"
                value={formFields.province}
                onChange={handleChange}
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
                name="country"
                value={formFields.country}
                onChange={handleChange}
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
                name="name"
                value={formFields.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formFields.email}
                onChange={handleChange}
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
                name="phone"
                value={formFields.phone}
                onChange={handleChange}
                placeholder="016242387"
              />
            </div>
          </div>
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">Property pictures</h3>
        <div className="w-100">
          <input
            ref={fileField}
            className="form-control d-none"
            type="file"
            multiple
            accept="image/*"
            id="pictures"
            onChange={handleImageUpload}
          />
          <div className="w-100 d-flex mb-4">
            {propertyImages.map((img, index) => (
              <div
                key={index}
                className="position-relative thumbnail-img"
                style={{ width: "120px" }}
              >
                <Image src={getFileUrl(img)} layout="fill" />
              </div>
            ))}
            <div
              className="bg-warning me-3"
              style={{ width: "120px", height: "64px" }}
            ></div>
            <div
              className="bg-warning me-3"
              style={{ width: "120px", height: "64px" }}
            ></div>
          </div>
          {uploadMessage && (
            <p className="text-danger fs-14">{uploadMessage}</p>
          )}
          <div
            onClick={handleOpenFileDialog}
            className="w-100 py-3 d-flex flex-column align-items-center justify-content-center cursor-pointer"
            style={{ border: "1px dashed green" }}
          >
            <div>
              <i className="bi bi-cloud-arrow-up-fill text-success fs-44"></i>
            </div>
            <p className="mb-0 fs-14">Click here to add Property pictures</p>
          </div>
        </div>
      </form>
    </div>
  );
}
