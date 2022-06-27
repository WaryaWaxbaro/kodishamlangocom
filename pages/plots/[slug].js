import admin from "../../firebase/nodeApp";
import Loader from "../../components/Loader";
import SingleListing from "../../components/SingleListing";

export default function singleListingForSale(props) {
  const listing = props.listing ? JSON.parse(props.listing) : {};

  if (Object.keys(listing).length < 1) {
    return <Loader />;
  }
  return <SingleListing listing={listing} listingType="plot" />;
}

export const getStaticPaths = async () => {
  const querySnapshot = await admin
    .firestore()
    .collection("apartments")
    .where("property_status", "array-contains", "plot")
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

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const querySnapshot = await admin
    .firestore()
    .collection("apartments")
    .where("slug", "==", slug)
    .get();

  const data = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    props: {
      listing: JSON.stringify(data[0]),
    },
    //revalidate: 10, // In seconds
  };
};
