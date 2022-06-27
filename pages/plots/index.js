import React, { useEffect } from "react";
import nookies from "nookies";

import admin from "../../firebase/nodeApp";
import StorageUploads from "../../models/storageUploads";
import Listings from "../../components/Listings";
import Loader from "../../components/Loader";

export default function plots(props) {
  let { listings } = props;

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
  return <Listings apartments={JSON.parse(listings)} apartmentType="holiday" />;
}

export async function getServerSideProps(context) {
  try {
    //const cookies = nookies.get(context);
    //const token = await admin.auth().verifyIdToken(cookies.token);
    //const {uid, email} = token;

    const listingEntries = await admin
      .firestore()
      .collection("apartments")
      .where("property_status", "array-contains", "plot")
      .get();

    const listings = JSON.stringify(
      listingEntries.docs.map((doc) => doc.data())
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
