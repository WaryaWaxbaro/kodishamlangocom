import { useState, useEffect } from "react";
import Link from "next/link";

import AdminLayout from "../../layout/AdminLayout";
import { useUser } from "../../context/userContext";
import { getApartmentPath } from "../../utils";
import { ApartmentModel, ReviewsModel } from "../../models/index";
import { formatPrice, sortByTimestamp } from "../../utils/index";
import ContactRequestCollapse from "../../components/ContactRequestCard";
import Pagination from "../../components/Pagination";
import ReviewCard from "../../components/ReviewCard";

let PageSize = 25;

export default function Reviews() {
  const [listings, setListings] = useState([]);
  const [paginatedListings, setPaginatedListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { currentUser, loadingUser } = useUser();

  useEffect(() => {
    const getApartments = async (userId) => {
      const listing = await new ApartmentModel({
        userId: `${userId}`,
      }).getAllByQuery();

      if (listing) {
        setListings(sortByTimestamp(listing));
      }
    };

    if (currentUser?.mId) {
      getApartments(currentUser.mId);
    }
  }, [loadingUser, currentUser]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const paginatedListings = listings.slice(firstPageIndex, lastPageIndex);
    setPaginatedListings(paginatedListings);
  }, [currentPage, listings]);

  const setItemIndex = (index, currentPage) => {
    let currentIndex = index + 1;
    if (currentPage > 1) {
      currentIndex = index + 1 + (currentPage - 1) * PageSize;
    }
    return currentIndex;
  };

  return (
    <AdminLayout>
      <div className="container-lg">
        <div className="max-width-960 mx-auto shadow rounded-10 my-4 p-2 p-sm-3 p-lg-4">
          <h2 className="fs-24 fw-bold ls-6 mb-5">Reviews</h2>
          {listings.length > 0 ? (
            <div className="w-100">
              {paginatedListings.map((listing, index) => (
                <div
                  key={listing.mId}
                  className="w-100 d-flex border-bottom border-gray-500 mb-3"
                >
                  <div className="me-3">
                    {setItemIndex(index, currentPage)}.
                  </div>
                  <div className="w-100">
                    <h3 className="fs-18 fw-normal">
                      {listing.title} - {formatPrice(listing.price)}
                    </h3>
                    <p className="mb-1 fs-14">
                      {listing.street}, {listing.city}, {listing.country}
                    </p>
                    <p className="mb-1 fs-14">{listing.apartment_type}</p>
                    <p className="mb-1 fs-14">
                      {listing.property_status.join(", ")}
                    </p>
                    <p>
                      <Link
                        href={getApartmentPath(
                          listing.property_status,
                          listing.slug
                        )}
                      >
                        <a className="fs-14">View Property</a>
                      </Link>
                    </p>
                    <ReviewCard propertyId={listing.mId} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-100">No Contact Requests yet</div>
          )}
          <Pagination
            currentPage={currentPage}
            totalCount={listings.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
