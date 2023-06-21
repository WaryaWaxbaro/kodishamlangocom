import { useState, useEffect } from "react";
import admin from "../firebase/nodeApp";
import StorageUploads from "../models/storageUploads";
import Hero from "../components/Hero";
import PopularPlaces from "../components/PopularPlaces";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import Image from "next/image";

export default function Home({ listings }) {
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const rentEntries = await admin
      .firestore()
      .collection("apartments")
      .where("property_status", "array-contains-any", ["sale", "rent"])
      .limit(6)
      .get();

    const rentListings = rentEntries.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    return {
      props: {
        listings: JSON.stringify(rentListings),
        messages: require(`../locales/${locale}.json`),
      },
    };
  } catch (error) {
    console.log("error", error);
  }
}
