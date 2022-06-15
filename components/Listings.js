import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Search from "./Search";
import AppDropdown from "./AppDropdown";
import SmallCard from "./SmallCard";
import Pagination from "./Pagination";
import { sortOrder } from "../utils";
import SharingModal from "./SharingModal";

let PageSize = 25;

export default function Listings({ apartments, setApartments, apartmentType }) {
  const [listedApartments, setListedApartments] = useState([]);
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [sharingInfo, setSharingInfo] = useState({ url: "", title: "" });

  const sharingModalButton = useRef(null);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const paginatedApartments = apartments.slice(firstPageIndex, lastPageIndex);
    setListedApartments(paginatedApartments);
  }, [currentPage, apartments]);

  useEffect(() => {
    const sortApartment = async (order) => {
      let sorted = [];
      switch (order) {
        case sortOrder[0]:
          sorted = listedApartments.sort((a, b) => {
            return a.createdAt.seconds - b.createdAt.seconds;
          });
          break;
        case sortOrder[1]:
          sorted = listedApartments.sort((a, b) => {}).reverse();
          break;
        case sortOrder[2]:
          sorted = listedApartments.sort((a, b) => {
            return b.views - a.views;
          });
          break;
        case sortOrder[3]:
          sorted = listedApartments.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        case sortOrder[4]:
          sorted = listedApartments.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        default:
          sorted = listedApartments.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
          });
      }
      console.log(sorted);
      setListedApartments(sorted);
      setCurrentPage(1);
    };

    sortApartment(sortBy);
  }, [sortBy]);

  const handleSetsSharingInfo = (url, title) => {
    setSharingInfo({ url, title });
    sharingModalButton.current.click();
  };

  return (
    <div className="container-lg">
      <div className="mt-3 mb-5">
        <h1 className="fs-34 fw-bold ls-6">Listings</h1>
      </div>
      <div className="w-100 mb-5">
        <Search />
      </div>
      {listedApartments && listedApartments.length > 0 ? (
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
              {listedApartments.map((apartment) => (
                <div className="col" key={apartment.mId}>
                  <SmallCard
                    apartment={apartment}
                    apartmentType={apartmentType}
                    setSharingInfo={handleSetsSharingInfo}
                  />
                </div>
              ))}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={apartments.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <>
          <p className="text-center">No result</p>
        </>
      )}
      <SharingModal sharingInfo={sharingInfo} />
      <button
        ref={sharingModalButton}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#sharingLinksModal"
      >
        Open sharing modal
      </button>
    </div>
  );
}
