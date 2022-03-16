import Link from "next/link";
import FeaturePropertyCard from "./FeaturePropertyCard";

export default function FeaturedProperties() {
  return (
    <section className="py-5 bg-gray-200">
      <div className="container-lg">
        <div className="text-center">
          <h2 className="fw-bold fs-32 mb-3">Featured Properties</h2>
          <p>These are our featured properties</p>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 g-4 mt-5">
          <div className="col">
            <FeaturePropertyCard />
          </div>
          <div className="col">
            <FeaturePropertyCard />
          </div>
        </div>
        <div className="w-100 text-center mt-5">
          <Link href="/">
            <a className="btn btn-primary btn-lg text-light fs-14 px-4 py-08 rounded-pill">
              <span className="d-flex align-item-center justify-content-center">
                <span className="d-block me-2">View More</span>
                <span className="b-block">
                  <i className="bi bi-arrow-right-circle-fill"></i>
                </span>
              </span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
