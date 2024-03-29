import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import Image from "next/image";

import {
  property_types,
  property_features,
  removeWhiteSpace,
  toUnderscoreKey,
  urlToObject,
  getFileUrl,
} from "../utils";

let dataWithNumbers = ["bedrooms", "bathrooms", "area", "guest", "price"];

const fieldValues = {
  title: "",
  description: "",
  property_status: ["rent"],
  apartment_type: "House",
  bedrooms: 1,
  bathrooms: 1,
  area: 125,
  guest: 1,
  price: 125000,
  price_duration: "Month",
  reserved: false,
  published: true,
  featured: false,
  street: "",
  postcode: "",
  sub_city: "",
  city: "",
  province: "",
  country: "Somalia",
  name: "",
  email: "",
  phone: "",
  likes: [],
};
const property_features_keys = property_features.map((feature) => {
  let k = toUnderscoreKey(feature);
  fieldValues[k] = false;
  return k;
});

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
    currentImages,
    setCurrentImages,
    removedCurrentImages,
    setRemovedCurrentImages,
  } = props;

  const t = useTranslations("NewListingForm");
  const t_status = useTranslations("PropertyStatus");
  const t_p_types = useTranslations("PropertyTypes");
  const t_p_duration = useTranslations("PriceDuration");
  const t_p_features = useTranslations("PropertyFeatures");

  const [formFields, setFormFields] = useState(fieldValues);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setFormFields(formFieldValues);
    } else {
      let storedFields = JSON.parse(sessionStorage.getItem("newListingData"));
      if (storedFields) {
        setFormFields(storedFields);
      } else {
        setFormFields(fieldValues);
      }
    }
  }, [formFieldValues]);

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
    let { name, value } = e.target;
    const elemType = e.target.type;
    let isChecked = e.target.checked;

    if (dataWithNumbers.includes(name)) {
      value = parseInt(value);
    }

    if (name === "property_status") {
      let currentStatus = formFields.property_status;
      if (currentStatus.indexOf(value) >= 0) {
        currentStatus = currentStatus.filter((item) => item !== value);
      } else {
        currentStatus = [...currentStatus, value];
      }

      setFormFields({
        ...formFields,
        [name]: currentStatus,
      });
    } else {
      setFormFields({
        ...formFields,
        [name]: isChecked ? isChecked : value,
      });
    }

    if (inputsRefs[name]) {
      inputsRefs[name].action("valid");
      errorFields.filter((field) => field !== name);
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
            `${t("file")} (${is_uploaded.name}) ${t("already_uploaded")}`
          );
          toast.error(
            `${t("file")} (${is_uploaded.name}) ${t("already_uploaded")}`
          );
        } else {
          if (propertyImages.length > 9) {
            setUploadMessage(t("upladed_max_allowed"));
            toast.error(t("upladed_max_allowed"));
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
    validatableFields.forEach((field) => {
      if (!formFields[field]) {
        inputsRefs[field].action("error");
        errorFields.push(field);
      }
    });

    if (formFields.property_status.length === 0) {
      toast.error(t("select_at_least_one_status"));
      return;
    }

    if (errorFields.length > 0) {
      toast.error(t("fill_all_required_fields"));
      sessionStorage.setItem("newListingData", JSON.stringify(formFields));
      return;
    }

    setFormData(formFields);
    setFormImages(propertyImages);
    setDisableBtn(true);
    setSyncData(true);
  };

  const setThumbnail = (imageFile) => {
    propertyImages
      .map((img) => img.name)
      .map((name) => {
        let thumb = document.getElementById(name);
        if (name === imageFile.name) {
          thumb.checked = true;
        } else {
          thumb.checked = false;
        }
      });
    let filtered = propertyImages.filter((img) => img.name === imageFile.name);
    setThumbnailImage(filtered);
    setSelectedThumbnail(imageFile.name);
  };

  const removeImageFromCurrentImages = (url) => {
    let filtered = currentImages.filter((obj) => obj.path_ !== url);
    setCurrentImages(filtered);
    setRemovedCurrentImages([...removedCurrentImages, url]);
  };

  return (
    <div className="w-100 p-2 p-sm-4 shadow">
      <form onSubmit={handleSubmit}>
        <h3 className="fs-16 fw-bold text-primary mb-3">
          {t("property_details")}
        </h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {t("property_title")} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formFields.title}
            onChange={handleChange}
            placeholder="Guri Villa Wayn"
            ref={titleRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            {t("property_description")} <span className="text-primary">*</span>
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formFields.description}
            onChange={handleChange}
            rows="4"
            placeholder="Faadlo kabixi sida. Gurigan waxaa u kuyalaa kasoo horjeeda Suuq weyne, waxa uu leeyahay dabaal, barxad wayn oo lagu fiidsado. Meel fiican na wuu ku yalaa"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">
            {t("property_status")} <span className="text-primary">*</span>
          </label>
          {["rent", "sale", "short stay", "plot"].map((status) => (
            <div key={status} className="form-check me-5">
              <input
                className="form-check-input"
                type="checkbox"
                name="property_status"
                onChange={handleChange}
                value={status}
                checked={formFields.property_status?.includes(status)}
                id={status}
              />
              <label
                className="form-check-label text-capitalize"
                htmlFor={status}
              >
                {t_status(status)}
              </label>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="apartment_type" className="form-label">
                {t("property_type")} <span className="text-primary">*</span>
              </label>
              <select
                className="form-select"
                id="apartment_type"
                name="apartment_type"
                value={formFields.apartment_type}
                onChange={handleChange}
                aria-label="apartment Type"
              >
                {property_types.map((property, index) => (
                  <option key={property}>{t_p_types(property)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="bedrooms" className="form-label">
                {t("bedrooms")} <span className="text-primary">*</span>
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
              <label htmlFor="bathrooms" className="form-label">
                {t("bathrooms")}
              </label>
              <input
                type="number"
                min={1}
                max={20}
                className="form-control"
                id="bathrooms"
                name="bathrooms"
                value={formFields.bathrooms}
                onChange={handleChange}
                placeholder="4"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="area" className="form-label">
                {t("area")}{" "}
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
                {t("guests")}
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
                {t("price")} <span className="text-primary">*</span>
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
                {t("price_duration")}
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
                    <option key={`${property}_${index}`} value={property}>
                      {property ? t_p_duration(property) : property}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <label className="form-label">{t("published_or_reserved")}</label>
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
                  {t("reserved")}
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
                  {t("publish")}
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">
          {t("property_features")}
        </h3>
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
                  {t_p_features(property_features[index])}
                </label>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">
          {t("property_location")}
        </h3>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="street" className="form-label">
                {t("street")} <span className="text-primary">*</span>
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
                {t("postcode")}
              </label>
              <input
                type="number"
                min={1}
                className="form-control"
                id="postcode"
                name="postcode"
                value={formFields.postcode}
                onChange={handleChange}
                placeholder="94000"
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="sub_city" className="form-label">
                {t("sub_city")} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="sub_city"
                name="sub_city"
                value={formFields.sub_city}
                onChange={handleChange}
                placeholder="Madino"
                ref={subCityRef}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                {t("city")} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formFields.city}
                onChange={handleChange}
                placeholder="Muqdisho"
                ref={cityRef}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="province" className="form-label">
                {t("provice")}
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
                {t("country")} <span className="text-primary">*</span>
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
        <h3 className="fs-16 fw-bold text-primary mb-3">
          {t("contact_information")}
        </h3>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                {t("full_name")} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formFields.name}
                onChange={handleChange}
                placeholder="Magaca qofka soo galiyay"
                ref={nameRef}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                {t("email")} <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formFields.email}
                onChange={handleChange}
                placeholder="magaca.kankale@example.com"
                ref={emailRef}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                {t("phone")} <span className="text-primary">*</span>
              </label>
              <input
                type="phone"
                className="form-control"
                id="phone"
                name="phone"
                value={formFields.phone}
                onChange={handleChange}
                placeholder="01624238734"
                ref={phoneRef}
              />
            </div>
          </div>
        </div>
        <hr />
        <h3 className="fs-16 fw-bold text-primary mb-3">
          {t("upload_images")}
        </h3>
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
          {currentImages?.length > 0 && (
            <>
              <p className="h6">{t("already_uploaded_images")}</p>
              <div className="my-3 w-100 d-flex flex-wrap">
                {currentImages.map((img, index) => (
                  <div
                    key={index}
                    className="position-relative thumbnail-img me-3 border border-primary rounded-5 mb-5"
                  >
                    {img.imageUrl && <Image src={img.imageUrl} layout="fill" />}
                    <span
                      onClick={() => removeImageFromCurrentImages(img.path_)}
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
                  </div>
                ))}
              </div>
            </>
          )}
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
                      {t("use_as_thumbnail")}
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
            <p className="mb-0 fs-14">{t("click_here_to_upload_images")}</p>
          </div>
        </div>

        <div className="d-grid my-5">
          <button
            type="submit"
            className="btn btn-primary btn-lg rounded-pill"
            disabled={disableBtn}
          >
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
}
