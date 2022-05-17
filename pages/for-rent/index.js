import React, { useEffect } from "react";
import nookies from "nookies";

import admin from "../../firebase/nodeApp";
import StorageUploads from "../../models/storageUploads";
import Listings from "../../components/Listings";
import Loader from "../../components/Loader";

export default function forRent(props) {
  let { listings } = props;

  console.log("listings", listings);

  useEffect(() => {
    const getThumbnails = async () => {
      const thumbnails = await new StorageUploads(
        "/apartments/thumbnails",
        null
      ).getListAll();
      console.log("thumbnails", thumbnails);
    };
    if (listings) {
      getThumbnails();
    }
  }, [listings]);

  if (!listings) {
    return <Loader />;
  }
  return <Listings apartments={JSON.parse(listings)} />;
}

export async function getServerSideProps(context) {
  console.log("*****");
  try {
    //const cookies = nookies.get(context);
    //const token = await admin.auth().verifyIdToken(cookies.token);
    //const {uid, email} = token;

    const listingEntries = await admin
      .firestore()
      .collection("apartments")
      .get();

    //79ktlzft6iA5Dj4EHjRx
    const files = "79ktlzft6iA5Dj4EHjRx";
    //.bucket(`${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`);
    //.get("/apartments/thumbnails/79ktlzft6iA5Dj4EHjRx");

    console.log("files", files);

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
