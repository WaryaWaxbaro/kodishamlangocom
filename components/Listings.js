import { useState, useEffect } from "react";
import Link from "next/link";

import Search from "./Search";
import AppDropdown from "./AppDropdown";
import SmallCard from "./SmallCard";
import { sortOrder } from "../utils";

export default function Listings({ apartments, setApartments, apartmentType }) {
  const [sortBy, setSortBy] = useState("Most Recent");

  useEffect(() => {
    const sortApartment = async (order) => {
      let sorted = [];
      switch (sortBy) {
        case sortOrder[0]:
          sorted = apartments.sort((a, b) => {
            return a.createdAt.seconds - b.createdAt.seconds;
          });
          break;
        case sortOrder[1]:
          sorted = apartments.sort((a, b) => {}).reverse();
          break;
        case sortOrder[2]:
          sorted = apartments.sort((a, b) => {
            return b.views - a.views;
          });
          break;
        case sortOrder[3]:
          sorted = apartments.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        case sortOrder[4]:
          sorted = apartments.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        default:
          sorted = apartments.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
          });
      }
      console.log(sorted);
      setApartments(sorted);
    };

    sortApartment();
  }, [sortBy]);

  return (
    <div className="container-lg">
      <div className="mt-3 mb-5">
        <h1 className="fs-34 fw-bold ls-6">Listings</h1>
      </div>
      <div className="w-100 mb-5">
        <Search />
      </div>
      {apartments && apartments.length > 0 ? (
        <>
          <div className="w-100 d-flex flex-column flex-sm-row justify-content-sm-between">
            <p>{apartments.length} Search results</p>
            <div className="d-flex align-items-center">
              <p className="mb-0 me-2" style={{ whiteSpace: " nowrap" }}>
                Sort By
              </p>
              <AppDropdown
                defaultItem={sortBy}
                mainLabelName="Sort By"
                zIndex={100}
                mainListItem={sortOrder}
                icon="<i class='bi bi-filter-right fs-18'></i>"
                setSelectedListItem={setSortBy}
              />
            </div>
          </div>
          <div className="w-100 my-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {apartments.map((apartment) => (
                <div className="col" key={apartment.mId}>
                  <SmallCard
                    apartment={apartment}
                    apartmentType={apartmentType}
                  />
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
        </>
      ) : (
        <>
          <p className="text-center">No result</p>
        </>
      )}
    </div>
  );
}
