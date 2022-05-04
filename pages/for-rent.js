import React from "react";
import nookies from "nookies";

import admin from "../firebase/nodeApp";
import Listings from "../components/Listings";

export default function forRent() {
  return <Listings />;
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
    console.log("listingEntries", listingEntries);
    const listings = JSON.stringify(
      listingEntries.docs.map((doc) => doc.data())
    );

    console.log("listings", listings);

    return {
      props: {
        listings,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        listings: [],
      },
    };
  }
}
