import { useState, useEffect, createContext, useContext } from "react";
import { UserModel, ApartmentModel } from "../models";

import { useUser } from "./userContext";

export const ListingContext = createContext();

export default function ListingContextComp({ children }) {
  const [listings, setListings] = useState(null);
  const [listingLoading, setListingLoading] = useState(true); // Helpful, to update the UI accordingly.

  const { currentUser, loadingUser } = useUser();

  useEffect(() => {
    const getApartments = async (userId) => {
      const listing = await new ApartmentModel({
        userId: `${userId}`,
      }).getAllByQuery();
      if (listing) {
        setListings(listing);
        setListingLoading(false);
      }
    };

    if (currentUser) {
      getApartments(currentUser.mId);
    }
  }, [loadingUser]);

  return (
    <ListingContext.Provider
      value={{
        listings,
        listingLoading,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useListing = () => useContext(ListingContext);
