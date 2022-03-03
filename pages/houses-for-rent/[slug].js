import data from "../../data/rent.json";
import { formatPrice } from "../../utils";
import Image from "next/image";

export default function SingleApartment(props) {
  const { apartment } = props;
  console.log("apartment ", apartment);
  return (
    <main>
      <div
        id="apartmentCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#apartmentCarousel"
            data-bs-slide-to={1}
            className="active"
            aria-current="true"
            aria-label={1}
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="w-100 position-relative"
              style={{ maxHeight: "80vh" }}
            >
              <Image src="/images/sun_sky.jpeg" layout="fill" />
              <div className="position-absolute start-0 top-0 w-100 h-100 bg-primary bg-opacity-50 d-flex align-items-center justify-content-center">
                <h1 className="fs-32 text-center max-width-280 text-white text-uppercase">
                  Pictures coming soon
                </h1>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#apartmentCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#apartmentCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <div className="max-width-960 mx-auto">
          <p>SME</p>
          <div className="max-width-680">
            <h2 className="mb-3">
              <span className="fs-48 text-primary ls-6">
                {formatPrice(apartment.price)}
              </span>
              <span className="h6 ls-6 text-primary text-capitalize">
                {" "}
                Kshs / {apartment.price_duration}{" "}
              </span>
            </h2>
            <h1 className="fs-1 ls-6">
              {apartment.bedroom} Bedroom, {apartment.location},{" "}
              {apartment.city}
            </h1>
            <p>{apartment.summary}</p>
          </div>
        </div>
        <div className="pt-3">
          <div className="max-width-960 mx-auto">
            <h2 className="fs-2">Facilities</h2>
            <p>Facilities</p>
          </div>
        </div>
        <div className="py-3">
          <div className="max-width-960 mx-auto">
            <h2 className="fs-2">Description</h2>
            <p style={{ textAlign: "justify" }}>
              {apartment.apartment_description}
            </p>
          </div>
        </div>
        <div className="py-3">
          <div className="max-width-960 mx-auto">
            <h2 className="fs-2">Distances (KM)</h2>
            <p>
              The distances in KM are approximate and are provided by the owner
              of the announcement. You may contact the owner for more
              information.
            </p>
            <div className="row">
              <div className="col-6 col-md-3">
                <p className="mb-0 mt-1 fs-16 text-capitalize">KEY:</p>
                <p className="mb-0 mt-1 fs-16">VALUE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-width-960 mx-auto my-5">
          <p>Contacts</p>
        </div>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  //const res = await fetch("https://.../posts");
  //const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data["data"].map((apartment) => ({
    params: { slug: apartment.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  const apartment = data["data"].filter((ap) => ap.slug === params.slug);
  return {
    props: {
      apartment: apartment[0],
    },
  };
}
