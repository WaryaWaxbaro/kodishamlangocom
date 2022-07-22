import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import HeadingWithLine from "../components/HeadingWithLine";
import ImageSlider from "../components/ImageSlider";
import Reviews from "../components/Reviews";
import ContactRequestForm from "../components/ContactRequestForm";
import ProfileCard from "../components/ProfileCard";
import StorageUploads from "../models/storageUploads";
import { ProfileModel } from "../models";
import { formatPrice, property_features, toUnderscoreKey } from "../utils";
import ViewCounter from "../components/ViewCounter";
import { currency } from "../utils/staticSetup";
import AppHead from "./AppHead";

export default function SingleListing({ listing, listingType }) {
  const t_features = useTranslations("FeaturedPropertyCard");
  const t_listing_form = useTranslations("NewListingForm");
  const t_amenities = useTranslations("PropertyFeatures");
  const t_property_types = useTranslations("PropertyTypes");

  const [images, setImages] = useState([]);
  const [agentProfile, setAgentProfile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [reload, setReload] = useState(true);
  const [reviewCount, setReviewCount] = useState(0);
  const [tokenAvailable, setTokenAvailable] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setTokenAvailable(true);
    }
  }, []);

  useEffect(() => {
    const getImages = async (id) => {
      const imagesList = await new StorageUploads(
        `apartments/${id}`
      ).getListAll();

      if (imagesList && imagesList.length > 0) {
        setImages(imagesList);
      }
    };

    const getAgentProfile = async (userId) => {
      const profile = await new ProfileModel({
        userId: `${userId}`,
      }).getAllByQuery();

      if (profile && profile.length > 0) {
        const currentProfile = profile[0];
        setAgentProfile(currentProfile);
        const profileUrl = await new StorageUploads(
          `profiles/${currentProfile.mId}`
        ).downloadURL();
        if (profileUrl) {
          setProfileImageUrl(profileUrl);
        }
      }
    };

    if (reload) {
      if (listing.mId) {
        getImages(listing.mId);
        getAgentProfile(listing.userId);
        setReload(false);
      }
    }
  }, [reload, listing]);

  return (
    <div className="container-lg py-5">
      <AppHead
        title={`${listing.title} - ${listing.sub_city} - ${
          listing.city
        } - ${formatPrice(listing.price)} - Gurikiro.com`}
        description={`${listing.description}`}
      />
      <div className="row">
        <div className="col-12 col-md-8 mb-3">
          {/* main heading */}
          <div className="w-100 d-flex flex-column flex-sm-row justify-content-sm-between">
            <div>
              <div className="d-flex">
                <h1 className="fs-28 fw-bold">
                  {listing.title}{" "}
                  {listing.property_status.indexOf("rent") >= 0 &&
                    listingType === "rent" && (
                      <span className="badge bg-primary ms-3 rounded-pill fs-14 fw-normal">
                        {t_features("for_rent")}
                      </span>
                    )}
                  {listing.property_status.indexOf("sale") >= 0 &&
                    listingType === "sale" && (
                      <span className="badge bg-primary ms-3 rounded-pill fs-14 fw-normal">
                        {t_features("for_sale")}
                      </span>
                    )}
                  {listing.property_status.indexOf("short stay") >= 0 &&
                    listingType === "short stay" && (
                      <span className="badge bg-primary ms-3 rounded-pill fs-14 fw-normal">
                        {t_features("short_stay")}
                      </span>
                    )}
                </h1>
              </div>
              <p>
                <span className="d-inline-block me-2">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <span>
                  {listing.street}, {listing.sub_city}, {listing.city}
                </span>
              </p>
            </div>
            <p className="fs-28 fw-bold text-primary ls-6">
              {currency} {formatPrice(listing.price)}
            </p>
          </div>
          {/* Gallery */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text={t_listing_form("gallery")}
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ImageSlider images={images} />
          </div>
          {/* Description */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text={t_listing_form("description")}
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <p>{listing.description}</p>
          </div>
          {/* Property Details */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text={t_listing_form("property_details")}
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ul className="list-unstyled d-flex flex-wrap">
              <li className="w-columns-30 mb-3">
                <span>{t_listing_form("property_type")}: </span>
                <span>{t_property_types(listing.apartment_type)}</span>
              </li>
              <li className="w-columns-30 mb-3">
                <span>{t_listing_form("property_status")}: </span>
                <span>
                  {listing.property_status.indexOf("rent") >= 0 &&
                    `${t_features("for_rent")}, `}{" "}
                  {listing.property_status.indexOf("sale") >= 0 &&
                    `${t_features("for_sale")}, `}
                  {listing.property_status.indexOf("short stay") >= 0 &&
                    `${t_features("for_holiday")}, `}
                </span>
              </li>
            </ul>
            <HeadingWithLine
              text={t_listing_form("property_features")}
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ul className="list-unstyled d-flex flex-wrap">
              {property_features.map((feature, index) => {
                return (
                  listing[toUnderscoreKey(feature)] && (
                    <li
                      key={toUnderscoreKey(feature) + "_" + index}
                      className="w-columns-30 mb-3"
                    >
                      <span className="d-inline-block me-2">
                        <i className="bi bi-check-square-fill text-primary"></i>
                      </span>
                      <span>{t_amenities(feature)}</span>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          {/* Reviews */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text={`${reviewCount} ${t_listing_form("reviews")}`}
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <Reviews
              propertyId={listing.mId}
              setReviewCount={setReviewCount}
              userId={listing.userId}
            />
          </div>
        </div>
        <div className="col-12 col-md-4">
          {/* Agent Information */}
          <div className="w-100 bg-white shadow p-3 mb-3">
            {agentProfile?.showProfile && (
              <div>
                <h3 className="fs-18 fw-bold ls-6">
                  {t_listing_form("agent_information")}
                </h3>
                <hr />
                <ProfileCard
                  profile={agentProfile}
                  profileImageUrl={profileImageUrl}
                />
                <hr />
              </div>
            )}
            <div className="w-100">
              <h5 className="fs-16 fw-bold ls-6">
                {t_listing_form("request_inquiry")}
              </h5>
              <ContactRequestForm listing={listing} listingType={listingType} />
            </div>
          </div>
          {/* Recent Properties */}
          <div className="w-100 d-none bg-white shadow p-3 mb-3">
            <h3 className="fs-18 fw-bold ls-6">
              {t_listing_form("recent_properties")}
            </h3>
            <hr />
            <div className="w-100">
              <div className="d-flex">
                <div
                  className="position-relative cover-img-img me-3"
                  style={{ height: "70px", width: "140px" }}
                >
                  <Image src="/images/cover/nairobi.png" layout="fill" />
                </div>
                <div className="w-100">
                  <h3 className="fs-16 fw-normal">Family Home</h3>
                  <p className="fs-14">{currency} 230,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tokenAvailable && (
        <ViewCounter id={listing.id} propertyId={listing.mId} />
      )}
    </div>
  );
}
