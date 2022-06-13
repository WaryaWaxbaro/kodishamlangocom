import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";

import { ApartmentModel } from "../../models";

import { useUser } from "../../context/userContext";
import ManageDashboard from "../../components/ManageDashboard";
import DashboardListing from "../../components/DashboardListing";
import DashboardMessage from "../../components/DashboardMessage";
import DashboardReview from "../../components/DashboardReview";

export default function dashboard() {
  const [listings, setListings] = useState([]);
  const [publishedProperties, setPublishedProperties] = useState(0);

  const { currentUser, loadingUser } = useUser();

  useEffect(() => {
    const getApartments = async (userId) => {
      const listing = await new ApartmentModel({
        userId: `${userId}`,
      }).getAllByQuery();

      if (listing) {
        // Sort the listings by date
        const sortedListings = listing.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds;
        });
        setListings(sortedListings);
      }
    };

    if (currentUser?.mId) {
      getApartments(currentUser.mId);
    }
  }, [loadingUser, currentUser]);

  useEffect(() => {
    const publishedPropertiesCount = listings.filter(
      (listing) => listing.published
    );
    setPublishedProperties(publishedPropertiesCount.length);
  }, [listings]);

  return (
    <AdminLayout>
      <div className="container-lg py-4">
        <ManageDashboard publishedProperties={publishedProperties} />
        {/* Listing */}
        <DashboardListing listings={listings} />
        {/* Message */}
        <DashboardMessage />
        {/* Review */}
        <DashboardReview />
      </div>
    </AdminLayout>
  );
}
