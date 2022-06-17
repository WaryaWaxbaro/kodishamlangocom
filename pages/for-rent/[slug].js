import { useEffect, useState } from "react";
import Image from "next/image";

import HeadingWithLine from "../../components/HeadingWithLine";
import ImageSlider from "../../components/ImageSlider";
import Reviews from "../../components/Reviews";
import ReviewForm from "../../components/ReviewForm";
import ContactRequestForm from "../../components/ContactRequestForm";
import ProfileCard from "../../components/ProfileCard";
import admin from "../../firebase/nodeApp";
import StorageUploads from "../../models/storageUploads";
import { ProfileModel } from "../../models";
import { formatPrice, property_features, toUnderscoreKey } from "../../utils";
import Loader from "../../components/Loader";

export default function singleListingForRent(props) {
  const listing = props.listing ? JSON.parse(props.listing) : {};
  const [images, setImages] = useState([]);
  const [agentProfile, setAgentProfile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [reload, setReload] = useState(true);

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

  if (Object.keys(listing).length < 1) {
    return <Loader />;
  }
  return (
    <div className="container-lg py-5">
      <div className="row">
        <div className="col-12 col-md-8 mb-3">
          {/* main heading */}
          <div className="w-100 d-flex flex-column flex-sm-row justify-content-sm-between">
            <div>
              <div className="d-flex">
                <h1 className="fs-28 fw-bold">
                  {listing.title}{" "}
                  {listing.property_status.indexOf("rent") >= 0 && (
                    <span className="badge bg-primary ms-3 rounded-pill fs-14 fw-normal">
                      For Rent
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
              Kshs {formatPrice(listing.price)}
            </p>
          </div>
          {/* Gallery */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Gallery"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ImageSlider images={images} />
          </div>
          {/* Description */}
          <div className="w-100 bg-white shadow p-3 mt-3">
            <HeadingWithLine
              text="Description"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <p>{listing.description}</p>
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
                <span>{listing.apartment_type}</span>
              </li>
              <li className="w-columns-30 mb-3">
                <span>Property status: </span>
                <span>
                  {listing.property_status.indexOf("rent") >= 0 && "For Rent "}{" "}
                  ,{listing.property_status.indexOf("sale") >= 0 && "For Sale "}
                  ,
                  {listing.property_status.indexOf("short stay") >= 0 &&
                    "For Holiday"}
                </span>
              </li>
            </ul>
            <HeadingWithLine
              text="Amenities"
              classNames="text-dark fs-18 fw-bold ls-6"
            />
            <ul className="list-unstyled d-flex justify-content-between flex-wrap">
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
                      <span>{feature}</span>
                    </li>
                  )
                );
              })}
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
            <Reviews propertyId={listing.mId} />
          </div>
        </div>
        <div className="col-12 col-md-4">
          {/* Agent Information */}
          {agentProfile?.showProfile && (
            <div className="w-100 bg-white shadow p-3 mb-3">
              <h3 className="fs-18 fw-bold ls-6">Agent Information</h3>
              <hr />
              <ProfileCard
                profile={agentProfile}
                profileImageUrl={profileImageUrl}
              />
              <hr />
              <div className="w-100">
                <h5 className="fs-16 fw-bold ls-6">Request Inquiry</h5>
                <ContactRequestForm />
              </div>
            </div>
          )}
          {/* Recent Properties */}
          <div className="w-100 bg-white shadow p-3 mb-3">
            <h3 className="fs-18 fw-bold ls-6">Recent Properties</h3>
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
                  <p className="fs-14">Kshs 230,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const querySnapshot = await admin
    .firestore()
    .collection("apartments")
    .where("property_status", "array-contains", "rent")
    .get();

  const data = querySnapshot.docs.map((doc) => {
    return {
      params: {
        slug: `${doc.data().slug}`,
      },
    };
  });

  return {
    paths: data,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const querySnapshot = await admin
    .firestore()
    .collection("apartments")
    .where("slug", "==", slug)
    .get();

  const data = querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  return {
    props: {
      listing: JSON.stringify(data[0]),
    },
    //revalidate: 10, // In seconds
  };
};
