import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import admin from "../../firebase/nodeApp";
import StorageUploads from "../../models/storageUploads";
import Listings from "../../components/Listings";
import Loader from "../../components/Loader";
import { sortDataByQuery } from "../../utils";

export default function forRent(props) {
  let { listings } = props;
  const router = useRouter();
  const { query } = router;

  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    if (listings && query) {
      let parsedListings = JSON.parse(listings) || [];
      if (query) {
        setApartments(sortDataByQuery(parsedListings, query));
      } else {
        setApartments(parsedListings);
      }
    }
  }, [listings, query]);

  useEffect(() => {
    const getThumbnails = async () => {
      const thumbnails = await new StorageUploads(
        "/apartments/thumbnails",
        null
      ).getListAll();
    };

    if (listings) {
      getThumbnails();
    }
  }, [listings]);

  if (!listings) {
    return <Loader />;
  }
  return (
    <Listings
      apartments={apartments}
      apartmentType="rent"
      setApartments={setApartments}
    />
  );
}

export async function getServerSideProps(context) {
  try {
    const listingEntries = await admin
      .firestore()
      .collection("apartments")
      .where("property_status", "array-contains", "rent")
      .get();

    const listings = JSON.stringify(
      listingEntries.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );

    return {
      props: {
        listings,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        listings: null,
      },
    };
  }
}
