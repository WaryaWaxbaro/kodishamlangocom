import React from "react";
import { unixToDate } from "../utils";
import CollapsibleBtn from "./CollapsibleBtn";

export default function MainApartments({ apartments, users }) {
  const getUserName = (id) => {
    return users.find((user) => user.mId === id).fullName;
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
                        <div>
                          <h6>Owner</h6>
                          <p>{getUserName(apartment.userId)}</p>
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
