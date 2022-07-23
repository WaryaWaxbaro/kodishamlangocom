import { useTranslations } from "next-intl";
import { unixToDate } from "../utils";
import CollapsibleBtn from "./CollapsibleBtn";
import MainApartmentContacts from "./MainApartmentContacts";
import MainApartmentReviews from "./MainApartmentReviews";

export default function MainApartments({
  apartments,
  users,
  reviews,
  contactRequests,
}) {
  const t = useTranslations("SiteOwner");
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
              <th>{t("more_info")}</th>
              <th></th>
              <th>{t("titlem")}</th>
              <th>{t("apartment_type")}</th>
              <th>{t("views")}</th>
              <th>{t("likes")}</th>
              <th>{t("street")}</th>
              <th>{t("sub_city")}</th>
              <th>{t("city")}</th>
              <th>{t("contact_info")}</th>
              <th>{t("property_status")}</th>
              <th>{t("published")}</th>
              <th>{t("added_on")}</th>
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
                      <i className="bi bi-check-square-fill text-success"></i>
                    ) : (
                      <i className="bi bi-x-square-fill text-danger"></i>
                    )}
                  </td>
                  <td>{unixToDate(apartment.createdAt.seconds)}</td>
                </tr>
                <tr>
                  <td className="p-0" colSpan="15">
                    <div className="collapse" id={`collapse_${index}`}>
                      <div className="card card-body">
                        <div className="row">
                          <div className="col-12">
                            <table>
                              <tbody>
                                <tr>
                                  <td className="pe-3">
                                    {t("property_owner")}
                                  </td>
                                  <td>{getUserName(apartment.userId)}</td>
                                </tr>
                              </tbody>
                            </table>
                            <hr />
                          </div>
                          {getReviewsByApartmentId(apartment.mId).length >
                            0 && (
                            <div className="col-12 col-lg-6">
                              <h6 className="fw-bold mb-3">{t("reviews")}</h6>
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
                              <h6 className="fw-bold mb-3">
                                {t("contact_requests")}
                              </h6>
                              {getContactRequestsByApartmentId(
                                apartment.mId
                              ).map((cRequest) => (
                                <MainApartmentContacts
                                  key={cRequest.mId}
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
