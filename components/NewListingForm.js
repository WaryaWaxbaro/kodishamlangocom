import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

import Image from "next/image";

import {
  property_types,
  property_features,
  removeWhiteSpace,
  toUnderscoreKey,
} from "../utils";

const fieldValues = {
  title: "Luxury Apartment",
  description:
    "This is a luxury apartment that is very spacious and has a lot of space for people to live in.",
  property_status_sale: false,
  property_status_rent: true,
  property_status_short_stay: false,
  apartment_type: "House",
  bedrooms: 1,
  bathroom: 1,
  area: 125,
  guest: 1,
  price: 125000,
  price_duration: "Month",
  reserved: false,
  published: true,
  featured: false,
  street: "Jalan Kebun",
  postcode: "90000",
  sub_city: "Eastleigh",
  city: "Nairobi",
  province: "Nairobi",
  country: "Kenya",
  name: "John Doe",
  email: "john.doe@gmail.com",
  phone: "0712345678",
};
const property_features_keys = property_features.map((feature) => {
  let k = toUnderscoreKey(feature);
  fieldValues[k] = false;
  return k;
});

console.log("property_features_keys", property_features_keys);

const validatableFields = [
  "title",
  "description",
  "price",
  "street",
  "city",
  "sub_city",
  "country",
  "name",
  "email",
  "phone",
];

export default function NewListingForm(props) {
  const {
    formFieldValues,
    isEditing,
    setFormData,
    setFormImages,
    setSyncData,
    disableBtn,
    setDisableBtn,
    setThumbnailImage,
  } = props;
  const [formFields, setFormFields] = useState(fieldValues);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  useEffect(() => {
    let storedFields = JSON.parse(sessionStorage.getItem("newListingData"));
    if (storedFields) {
      setFormFields(storedFields);
    } else {
      if (isEditing) {
        setFormFields(formFieldValues);
      } else {
        setFormFields(fieldValues);
      }
    }
  }, []);

  const [propertyImages, setPropertyImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [maxUploads, setMaxUploads] = useState(0);

  const fileField = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const streetRef = useRef(null);
  const subCityRef = useRef(null);
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const errorFields = [];

  const updateRefClass = (ref, msg) => {
    if (ref.current) {
      if (msg === "error") {
        ref.current.classList.add("is-invalid");
      } else {
        ref.current.classList.remove("is-invalid");
      }
    }
  };

  const inputsRefs = {
    title: { action: (msg) => updateRefClass(titleRef, msg) },
    description: { action: (msg) => updateRefClass(descriptionRef, msg) },
    price: { action: (msg) => updateRefClass(priceRef, msg) },
    street: { action: (msg) => updateRefClass(streetRef, msg) },
    sub_city: { action: (msg) => updateRefClass(subCityRef, msg) },
    city: { action: (msg) => updateRefClass(cityRef, msg) },
    country: { action: (msg) => updateRefClass(countryRef, msg) },
    name: { action: (msg) => updateRefClass(nameRef, msg) },
    email: { action: (msg) => updateRefClass(emailRef, msg) },
    phone: { action: (msg) => updateRefClass(phoneRef, msg) },
  };

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

    if (inputsRefs[e.target.name]) {
      inputsRefs[e.target.name].action("valid");
      errorFields.filter((field) => field !== e.target.name);
    }
  };

  const handleOpenFileDialog = () => {
    fileField.current.click();
  };

  useEffect(() => {
    setUploadMessage("");
    let files = uploadedFiles;
    if (files && files.length > 0) {
      let currentFiles = [];
      Array.from(files).forEach((file) => {
        let is_uploaded = propertyImages.find((img) => img.name === file.name);
        if (is_uploaded) {
          setUploadMessage(
            `File (${is_uploaded.name}) has been already uploaded.`
          );
          toast.error(`File (${is_uploaded.name}) has been already uploaded.`);
        } else {
          if (propertyImages.length > 9) {
            setUploadMessage("Uploaded maximum photos allowed.");
            toast.error("Uploaded maximum photos allowed.");
            return;
          } else {
            currentFiles.push(file);
          }
        }
      });
      setPropertyImages([...currentFiles, ...propertyImages]);
      fileField.current.value = null;
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

  const removeImageFile = (imageFile) => {
    let filtered = propertyImages.filter((img) => img.name !== imageFile.name);
    setPropertyImages(filtered);
    if (selectedThumbnail === imageFile.name) {
      setSelectedThumbnail(null);
      setThumbnailImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formFields", formFields);
    validatableFields.forEach((field) => {
      if (!formFields[field]) {
        inputsRefs[field].action("error");
        errorFields.push(field);
      }
    });

    if (!formFields.property_status_sale && !formFields.property_status_rent) {
      toast.error("Please select at least one property status.");
      return;
    }

    if (errorFields.length > 0) {
      toast.error("Please fill all required fields.");
      sessionStorage.setItem("newListingData", JSON.stringify(formFields));
      return;
    }

    setFormData(formFields);
    setFormImages(propertyImages);
    setDisableBtn(true);
    setSyncData(true);

    console.log("errorFields", errorFields);
  };

  const setThumbnail = (imageFile) => {
    propertyImages
      .map((img) => img.name)
      .map((name) => {
        let thumb = document.getElementById(name);
        console.log("thumb", thumb);
        if (name === imageFile.name) {
          thumb.checked = true;
        } else {
          thumb.checked = false;
        }
        console.log("thumb", thumb);
      });
    let filtered = propertyImages.filter((img) => img.name === imageFile.name);
    setThumbnailImage(filtered);
    setSelectedThumbnail(imageFile.name);
    console.log("filtered", filtered);
  };

  return (
    <div className="w-100 p-2 p-sm-4 shadow">
      <form onSubmit={handleSubmit}>
        <h3 className="fs-16 fw-bold text-primary mb-3">Property Details</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Property Title <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formFields.title}
            onChange={handleChange}
            placeholder="Luxury Villa House"
            ref={titleRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Property Description <span className="text-primary">*</span>
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formFields.description}
            onChange={handleChange}
            rows="4"
            placeholder="This is a luxury villa house with a pool, a garden, a terrace and a private garden."
            ref={descriptionRef}
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
              <label htmlFor="apartment_type" className="form-label">
                Property Type <span className="text-primary">*</span>
              </label>
              <select
                className="form-select"
                id="apartment_type"
                name="propery_type"
                value={formFields.apartment_type}
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
                Price <span className="text-primary">*</span>
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
                ref={priceRef}
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
                ref={streetRef}
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
                ref={subCityRef}
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
                ref={cityRef}
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
                ref={countryRef}
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
                ref={nameRef}
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
                ref={emailRef}
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
                ref={phoneRef}
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
                className="position-relative thumbnail-img me-3 border border-primary rounded-5 mb-5"
              >
                <Image src={getFileUrl(img)} layout="fill" />
                <span
                  onClick={() => removeImageFile(img)}
                  className="btn btn-danger bg-opacity-75 border-0 rounded-circle d-block position-absolute d-flex align-items-center justify-content-center p-0"
                  style={{
                    width: "20px",
                    height: "20px",
                    right: "-5px",
                    top: "-5px",
                  }}
                >
                  <span className="d-block text-light">
                    <i className="bi bi-x"></i>
                  </span>
                </span>
                <div
                  className="fs-12 position-absolute start-0"
                  style={{ bottom: "-30px" }}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={img.name}
                      id={img.name}
                      onChange={() => setThumbnail(img)}
                    />
                    <label className="form-check-label" htmlFor={img.name}>
                      Use as a thumbnail
                    </label>
                  </div>
                </div>
              </div>
            ))}
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
        <div className="d-grid my-5">
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-pill"
            disabled={disableBtn}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
