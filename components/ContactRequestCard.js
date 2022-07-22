import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { unixToDate, getYesterdayDate } from "../utils";
import { ContactRequestModel } from "../models/index";
import { sortByTimestamp } from "../utils/index";

export default function ContactRequestCard({ listingId }) {
  const t = useTranslations("ContactRequestCard");
  const [contactRequests, setContactRequests] = useState([]);
  const [todayContactRequests, setTodayContactRequests] = useState([]);

  useEffect(() => {
    const getContactRequests = async () => {
      const contactRequest = await new ContactRequestModel({
        listingId,
      }).getAllByQuery();

      if (contactRequest) {
        const sortedContactRequests = sortByTimestamp(contactRequest);
        let todayContacts = sortedContactRequests.filter(
          (contactRequest) =>
            new Date(contactRequest.createdAt.seconds * 1000).getTime() >
            getYesterdayDate().getTime()
        );
        setContactRequests(sortedContactRequests);
        setTodayContactRequests(todayContacts);
      }
    };
    if (listingId) {
      getContactRequests();
    }
  }, []);

  if (contactRequests.length === 0) {
    return (
      <p className="fs-12 text-info">
        {t("no_contacts")} ({contactRequests.length})
      </p>
    );
  }
  return (
    <div className="w-100">
      <div className="w-100 mb-3">
        <button
          className="btn btn-primary btn-sm rounded-pill px-4 position-relative"
          data-bs-toggle="collapse"
          data-bs-target={`#contactRequest-${listingId}`}
          aria-expanded="false"
          aria-controls={`#contactRequest-${listingId}`}
        >
          {t("view_contact_results")} ({contactRequests.length})
          {todayContactRequests.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          )}
        </button>
      </div>
      <div className="collapse" id={`contactRequest-${listingId}`}>
        {contactRequests.map((contactRequest, index) => (
          <div key={contactRequest.mId} className="card card-body mb-3">
            <table>
              <tbody>
                <tr>
                  <th className="w-200">{t("name")}</th>
                  <td>{contactRequest.name}</td>
                </tr>
                <tr>
                  <th>{t("phone")}</th>
                  <td>{contactRequest.phone}</td>
                </tr>
                <tr>
                  <th>{t("email")}</th>
                  <td>{contactRequest.email}</td>
                </tr>
                <tr>
                  <th>{t("message")}</th>
                  <td>{contactRequest.message}</td>
                </tr>
                <tr>
                  <th>{t("sent_at")}</th>
                  <td>{unixToDate(contactRequest.createdAt.seconds)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
