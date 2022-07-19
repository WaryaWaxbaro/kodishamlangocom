import React from "react";
import { unixToDate } from "../utils";
import CollapsibleBtn from "./CollapsibleBtn";
import MainApartmentContacts from "./MainApartmentContacts";
import MainApartmentReviews from "./MainApartmentReviews";
import ReviewStars from "./ReviewStars";

export default function MainApartments({
  apartments,
  users,
  reviews,
  contactRequests,
}) {
  const getUserName = (id) => {
    return users.find((user) => user.mId === id).fullName;
  };

  const getReviewsByApartmentId = (id) => {
    return reviews.filter((review) => review.propertyId === id);
  };

  const getContactRequestsByApartmentId = (id) => {
    return contactRequests.filter(
      (contactRequest) => contactRequest.listingId === id
    );
  };

  return (
    <div className="w-100 my-4">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>More Info</th>
              <th></th>
              <th>Title</th>
              <th>Apartment Type</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Street</th>
              <th>Sub City</th>
              <th>City</th>
              <th>Contact info</th>
              <th>Property Status</th>
              <th>Published</th>
              <th>Added on</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((apartment, index) => (
              <>
                <tr>
                  <td>
                    <CollapsibleBtn id={index} />
                  </td>
                  <td>{index + 1}</td>
                  <td>{apartment.title}</td>
                  <td>{apartment.apartment_type}</td>
                  <td>{apartment.views}</td>
                  <td>{apartment.likes?.length}</td>
                  <td>{apartment.street}</td>
                  <td>{apartment.sub_city}</td>
                  <td>{apartment.city}</td>
                  <td>
                    <span className="d-block">{apartment.name}</span>
                    <span className="d-block">{apartment.email}</span>
                    <span className="d-block">{apartment.phone}</span>
                  </td>
                  <td>{apartment.property_status.join(", ")}</td>
                  <td>
                    {apartment.published ? (
                      <i class="bi bi-check-square-fill text-success"></i>
                    ) : (
                      <i class="bi bi-x-square-fill text-danger"></i>
                    )}
                  </td>
                  <td>{unixToDate(apartment.createdAt.seconds)}</td>
                </tr>
                <tr>
                  <td className="p-0" colSpan="15">
                    <div class="collapse" id={`collapse_${index}`}>
                      <div class="card card-body">
                        <div className="row">
                          <div className="col-12">
                            <table>
                              <tbody>
                                <tr>
                                  <td className="pe-3">Propery Owner</td>
                                  <td>{getUserName(apartment.userId)}</td>
                                </tr>
                              </tbody>
                            </table>
                            <hr />
                          </div>
                          {getReviewsByApartmentId(apartment.mId).length >
                            0 && (
                            <div className="col-12 col-lg-6">
                              <h6 className="fw-bold mb-3">Reviews</h6>
                              {getReviewsByApartmentId(apartment.mId).map(
                                (review) => (
                                  <MainApartmentReviews
                                    key={review.mId}
                                    review={review}
                                  />
                                )
                              )}
                            </div>
                          )}
                          {getContactRequestsByApartmentId(apartment.mId)
                            .length > 0 && (
                            <div className="col-12 col-lg-6">
                              <h6 className="fw-bold mb-3">Contact Requests</h6>
                              {getContactRequestsByApartmentId(
                                apartment.mId
                              ).map((cRequest) => (
                                <MainApartmentContacts
                                  contactRequest={cRequest}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
