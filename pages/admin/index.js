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
  const [dashboardCount, setDashboardCount] = useState({
    properties: 0,
    reviews: 0,
    messages: 0,
  });
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
        setDashboardCount({
          ...dashboardCount,
          properties: listings.filter((listing) => listing.published).length,
        });
        let listingIds = listing.map((listing) => listing.mId);
        getReviews(listingIds);
        getContacts(listingIds);
      }
    };

    const getReviews = async (ids) => {
      const allRevs = await new ReviewsModel({}).getListOfItems(
        "propertyId",
        ids
      );
      if (allRevs.length > 0) {
        setReviews(allRevs);
        setDashboardCount({
          ...dashboardCount,
          reviews: allRevs.length,
        });
      }
    };

    const getContacts = async (ids) => {
      const allContacts = await new ContactRequestModel({}).getListOfItems(
        "listingId",
        ids
      );
      if (allContacts.length > 0) {
        setContactRequests(allContacts);
        setDashboardCount({
          ...dashboardCount,
          messages: allContacts.length,
        });
      }
    };

    if (currentUser?.mId) {
      getApartments(currentUser.mId);
    }
  }, [loadingUser, currentUser]);

  return (
    <AdminLayout>
      <div className="container-lg py-4">
        <ManageDashboard
          dashboardCount={{
            properties: listings.length,
            reviews: reviews.length,
            messages: contactRequests.length,
          }}
        />
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
