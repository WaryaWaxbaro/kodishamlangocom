import admin from "../../firebase/nodeApp";
import Loader from "../../components/Loader";
import SingleListing from "../../components/SingleListing";

export default function SingleListingForHoliday(props) {
  const listing = props.listing ? JSON.parse(props.listing) : {};

  if (Object.keys(listing).length < 1) {
    return <Loader />;
  }
  return <SingleListing listing={listing} listingType="short stay" />;
}

export const getStaticPaths = async () => {
  const querySnapshot = await admin
    .firestore()
    .collection("apartments")
    .where("property_status", "array-contains", "short stay")
    .get();

  const data = querySnapshot.docs.map((doc) => {
    return {
      params: {
        slug: `${doc.data().slug}`,
      },
    };
  });

  return {
    paths: data,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const { slug } = params;
  const querySnapshot = await admin
    .firestore()
    .collection("apartments")
    .where("slug", "==", slug)
    .get();

  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return {
    props: {
      listing: JSON.stringify(data[0]),
      messages: require(`../../locales/${locale}.json`),
    },
    revalidate: 10, // In seconds
  };
};
