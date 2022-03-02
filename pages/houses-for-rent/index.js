import Image from "next/image";
import ApartmentInfoCard from "../../components/ApartmentInfoCard";
import data from "../../data/rent.json";

export default function housesForRent(props) {
  let { apartments } = props;
  return (
    <>
      <header className="w-100 m-0 height-sm-60vh position-relative">
        <Image src="/images/houses_for_rent.png" layout="fill" />
        <div
          className="position-absolute start-50 top-50 d-inline-block bg-white bg-opacity-75 p-4 rounded-3"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 className="fs-48 ls-6 mb-4 text-center">Houses for rent</h1>
        </div>
      </header>
      <div className="container-lg">
        <div className="max-width-680 mx-auto my-4 position-relative shadow border rounded-3 p-3 cover-img-bottom">
          <div className="mb-4 d-flex align-items-center justify-content-center">
            <i className="bi bi-info-circle fs-28 text-info"></i>
          </div>
          <p className="ls-6 fs-16">
            <span>
              A rental home is an easy and trouble-free way of living. You
              simply pay a monthly rent, and mostly the owner will take care of
              everything related to ownership, maintenance and repairs.{" "}
            </span>
            <span className="d-none d-sm-inline">
              Should you wish to move to a larger or smaller home or to another
              city or town, it is easy to give up the old rental apartment and
              make the switch to a new one. We have a large selection of rental
              homes, from small studio apartments to spacious family homes. Our
              homes are available throughout the country and range from row
              houses to duplexes and apartments. Our rental homes are a safe
              choice in every situation and phase of life.
            </span>
          </p>
        </div>
        <div className="pt-3 pt-sm-5">
          <h2 className="fs-2 ls-6 mb-4 d-none d-sm-block">Search for Homes</h2>
          <div className="d-grid d-sm-none mb-4">
            <button
              className="btn btn-primary rounded-0 btn-lg"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseRent"
              aria-expanded="false"
              aria-controls="collapseRent"
            >
              <span className="d-flex align-items-center justify-content-around">
                <span className="d-block">Search for Homes</span>
                <span className="d-block square-25">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </span>
            </button>
          </div>
          <div
            id="collapseRent"
            className="collapse disable-collapse-sm w-100 p-3 border rounded-3 shadow bg-primary bg-opacity-10"
          >
            form
          </div>
          <div className="w-100">
            {true && (
              <>
                <div className="max-width-550 mx-auto text-center ">
                  <p className="my-3">
                    Search Alert will help you to get notifications about new
                    apartments that matches your search as they are immediately
                    added.
                  </p>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-dark btn-lg rounded-0"
                    data-bs-toggle="modal"
                    data-bs-target="#searchAgentModal"
                  >
                    Save Search Alert
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div id="apt-cards" className="py-3 py-sm-5">
          {apartments && apartments.length > 0 ? (
            <>
              <div className="d-flex flex-column flex-sm-row justify-content-between py-4">
                <p className="fs-16">
                  <span className="d-inline-block">Page 1/3 of 3 Records</span>
                </p>
                <div>Sorter</div>
              </div>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {apartments.map((apartment) => (
                  <div key={apartment.id} className="col">
                    <ApartmentInfoCard apartment={apartment} />
                  </div>
                ))}
              </div>
              <div className="my-5 d-flex align-items-center justify-content-center">
                pagination
              </div>
            </>
          ) : (
            <div className="py-4 shadow rounded-3">
              <h2 className="text-primary text-center fs-4">No result.</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  //const res = await fetch(`https://.../data`);
  //const data = await res.json();

  // Pass data to the page via props
  return { props: { apartments: data["data"] } };
}
