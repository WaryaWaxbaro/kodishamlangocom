import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";

import { ApartmentModel, ReviewsModel } from "../../models";

import { useUser } from "../../context/userContext";
import ManageDashboard from "../../components/ManageDashboard";
import DashboardListing from "../../components/DashboardListing";
import DashboardMessage from "../../components/DashboardMessage";
import DashboardReview from "../../components/DashboardReview";
import { ContactRequestModel } from "../../models/index";

export default function dashboard() {
  const [listings, setListings] = useState([]);
  const [publishedProperties, setPublishedProperties] = useState(0);
  const [contactRequests, setContactRequests] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { currentUser, loadingUser } = useUser();

  useEffect(() => {
    const getApartments = async (userId) => {
      const listing = await new ApartmentModel({
        userId: `${userId}`,
      }).getAllByQuery();

      if (listing) {
        // Sort the listings by date
        console.log(listing.length);
        const sortedListings = listing.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds;
        });
        setListings(sortedListings);
      }
    };

    const getContactRequests = async (userId) => {
      const contactRequest = await new ContactRequestModel({
        userId: `${userId}`,
      }).getAllByQueryWithLimit(5);

      if (contactRequest) {
        // Sort the listings by date
        console.log(contactRequest);
        const sortedContactRequests = contactRequest.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds;
        });
        setContactRequests(sortedContactRequests);
      }
    };

    if (currentUser?.mId) {
      getApartments(currentUser.mId);
      getContactRequests(currentUser.mId);
    }
  }, [loadingUser, currentUser]);

  useEffect(() => {
    const publishedPropertiesCount = listings.filter(
      (listing) => listing.published
    );
    setPublishedProperties(publishedPropertiesCount.length);

    const getReviews = async () => {
      const ids = listings.map((listing) => listing.mId);
      ids.forEach(async (id) => {
        const review = await new ReviewsModel({
          propertyId: id,
        }).getAllByQueryWithLimit(1);

        if (review.length > 0) {
          setReviews([...reviews, { ...review[0] }]);
        }
      });
    };

    if (publishedPropertiesCount.length > 0) {
      getReviews();
    }
  }, [listings]);

  return (
    <AdminLayout>
      <div className="container-lg py-4">
        <ManageDashboard publishedProperties={publishedProperties} />
        {/* Listing */}
        <DashboardListing listings={listings} />
        {/* Message */}
        <DashboardMessage contactRequests={contactRequests} />
        {/* Review */}
        <DashboardReview reviews={reviews} listings={listings} />
      </div>
    </AdminLayout>
  );
}
