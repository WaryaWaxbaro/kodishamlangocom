import { useState, useEffect } from "react";

import { ApartmentModel } from "../../../models";
import StorageUploads from "../../../models/storageUploads";
import { useUser } from "../../../context/userContext";
import AdminLayout from "../../../layout/AdminLayout";
import PropertyListItem from "../../../components/PropertyListItem";

export default function myProperties() {
  const [listings, setListings] = useState([]);
  const [thumnails, setThumnails] = useState([]);

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

    if (currentUser) {
      getApartments(currentUser.mId);
    }
  }, [loadingUser]);

  useEffect(() => {
    const getThumbnails = async (listingIds) => {
      const thumbnails = listingIds.forEach(async (listingId) => {
        const thumbanil = await new StorageUploads(
          `apartments/thumbnails/${listingId}`
        ).downloadURL();
        setThumnails((prevThumbnails) => [
          ...prevThumbnails,
          { id: listingId, img: thumbanil },
        ]);
        return thumbanil;
      });
    };
    if (listings) {
      const listingIds = listings.map((listing) => listing.mId);
      getThumbnails(listingIds);
    }
  }, [listings]);

  const getThumbnail = (listingId) => {
    const foundThumbnail = thumnails.find(
      (thumbnail) => thumbnail.id === listingId
    );
    return foundThumbnail?.img ? foundThumbnail.img : "";
  };
  return (
    <AdminLayout>
      <div className="container-lg">
        <div className="max-width-960 mx-auto shadow rounded-10 my-4 p-2 p-sm-3 p-lg-4">
          <div className="table-responsive">
            <table className="table">
              <thead className="table">
                <tr className="table-primary">
                  <th>My Property</th>
                  <th className="fw-normal">Date Added</th>
                  <th className="fw-normal">Views</th>
                  <th className="fw-normal" colSpan={2}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <PropertyListItem
                    key={listing.mId}
                    listing={listing}
                    thumbnail={getThumbnail(listing.mId)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
