import { useState, useEffect } from "react";
import { unixToDate, getYesterdayDate } from "../utils";
import { ContactRequestModel } from "../models/index";

export default function ContactRequestCard({ listingId }) {
  const [contactRequests, setContactRequests] = useState([]);
  const [todayContactRequests, setTodayContactRequests] = useState([]);

  useEffect(() => {
    const getContactRequests = async () => {
      const contactRequest = await new ContactRequestModel({
        listingId,
      }).getAllByQuery();

      if (contactRequest) {
        // Sort the listings by date
        console.log(contactRequest);
        const sortedContactRequests = contactRequest.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds;
        });
        let todayContacts = sortedContactRequests.filter(
          (contactRequest) =>
            new Date(contactRequest.createdAt.seconds * 1000).getTime() >
            getYesterdayDate().getTime()
        );
        console.log(todayContacts);
        setContactRequests(sortedContactRequests);
        setTodayContactRequests(todayContacts);
      }
    };
    if (listingId) {
      getContactRequests();
    }
  }, []);

  console.log("yesterday date", getYesterdayDate().getTime());

  if (contactRequests.length === 0) {
    return null;
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
          View Contact Requests ({contactRequests.length})
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
                  <th className="w-200">Name</th>
                  <td>{contactRequest.name}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{contactRequest.phone}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{contactRequest.email}</td>
                </tr>
                <tr>
                  <th>Message</th>
                  <td>{contactRequest.message}</td>
                </tr>
                <tr>
                  <th>Sent At</th>
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
