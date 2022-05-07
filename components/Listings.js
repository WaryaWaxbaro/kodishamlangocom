import { useState } from "react";
import Search from "./Search";
import AppDropdown from "./AppDropdown";
import SmallCard from "./SmallCard";

export default function Listings({ apartments }) {
  const [sortBy, setSortBy] = useState(null);
  return (
    <div className="container-lg">
      <div className="mt-3 mb-5">
        <h1 className="fs-34 fw-bold ls-6">Listings</h1>
      </div>
      <div className="w-100 mb-5">
        <Search />
      </div>
      <div className="w-100 d-flex flex-column flex-sm-row justify-content-sm-between">
        <p>{9} Search results</p>
        <div className="d-flex align-items-center">
          <p className="mb-0 me-2" style={{ whiteSpace: " nowrap" }}>
            Sort By
          </p>
          <AppDropdown
            defaultItem="Recently added"
            zIndex={100}
            mainListItem={[
              "Top Selling",
              "Most Viewed",
              "Price (low to hight)",
              "Price (hight to low)",
            ]}
            icon="<i class='bi bi-filter-right fs-18'></i>"
            setSelectedListItem={setSortBy}
          />
        </div>
      </div>
      <div className="w-100 my-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {apartments.map((apartment) => (
            <div className="col" key={apartment.mId}>
              <SmallCard apartment={apartment} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-100 my-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
