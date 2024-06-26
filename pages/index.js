import { useState, useEffect } from "react";
import admin from "../firebase/nodeApp";
import StorageUploads from "../models/storageUploads";
import Hero from "../components/Hero";
import PopularPlaces from "../components/PopularPlaces";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import Image from "next/image";

export default function Home({ listings }) {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    console.log("listings", listings);
    let parsedListings = JSON.parse(listings) || [];

    const getThumbnails = async (listingIds) => {
      const thumbnails = listingIds.forEach(async (listingId) => {
        const thumbanil = await new StorageUploads(
          `apartments/thumbnails/${listingId}`
        ).downloadURL();
        setThumbnails((prevThumbnails) => [
          ...prevThumbnails,
          { id: listingId, img: thumbanil },
        ]);
        return thumbanil;
      });
    };
    if (parsedListings) {
      const listingIds = parsedListings.map((listing) => listing.mId);
      getThumbnails(listingIds);
    }
  }, [listings]);

  return (
    <>
      <Hero />
      <div className="container d-flex justify-content-center">
        <div className="d-inline-block mx-auto my-4">
          <a href="https://flyiisi.com/" target="_blank" rel="noreferrer">
            <Image src="/flyiisi_banner.png" width={728} height={120} />
          </a>
        </div>
      </div>
      <PopularPlaces />
      <FeaturedProperties
        thumbnails={thumbnails}
        listings={JSON.parse(listings)}
      />
      <WhyChooseUs />
    </>
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
