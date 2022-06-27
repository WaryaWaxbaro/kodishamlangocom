import { useState, useEffect } from "react";
import { unixToDate } from "../utils";
import { ContactRequestModel } from "../models/index";

export default function ContactRequestCard({ listingId }) {
  const [contactRequests, setContactRequests] = useState([]);

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
        setContactRequests(sortedContactRequests);
      }
    };
    if (listingId) {
      getContactRequests();
    }
  }, []);

  if (contactRequests.length === 0) {
    return null;
  }
  return (
    <div className="w-100">
      <div className="w-100 mb-3">
        <button
          className="btn btn-primary btn-sm rounded-pill px-4"
          data-bs-toggle="collapse"
          data-bs-target={`#contactRequest-${listingId}`}
          aria-expanded="false"
          aria-controls={`#contactRequest-${listingId}`}
        >
          View Contact Requests ({contactRequests.length})
        </button>
      </div>
      <div className="collapse" id={`contactRequest-${listingId}`}>
        {contactRequests.map((contactRequest, index) => (
          <div className="card card-body mb-3">
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
