import React from "react";
import ReviewStars from "../../components/ReviewStars";
import AdminLayout from "../../layout/AdminLayout";

const lists = [
  {
    name: "Luxury Restaurent",
    price: 45000,
    added_date: "2020-01-01",
    status: "active",
    id: 1,
  },
  {
    name: "Gym in Town",
    price: 21000,
    added_date: "2020-01-01",
    status: "active",
    id: 2,
  },
];

export default function dashboard() {
  return (
    <AdminLayout>
      <div className="container-lg py-4">
        <div className="w-100 p-2 p-sm-3 shadow mb-4">
          <h1 className="fs-22 fw-bold ls-6 mb-4">Manage Dashboard</h1>
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="w-100 h-100 text-white bg-danger rounded-10 px-3 py-4 d-flex align-items-center">
                <div className="p-2 pe-3 border-end border-2 border-light fs-32 me-4">
                  <i className="bi bi-list-ul"></i>
                </div>
                <div>
                  <p className="fs-32 mb-0">345</p>
                  <p className="mb-2">Published Property</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="w-100 h-100 text-white bg-warning rounded-10 px-3 py-4 d-flex align-items-center">
                <div className="p-2 pe-3 border-end border-2 border-light fs-32 me-4">
                  <i className="bi bi-star-fill"></i>
                </div>
                <div>
                  <p className="fs-32 mb-0">116</p>
                  <p>Total Reviews</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="w-100 h-100 text-white bg-blue rounded-10 px-3 py-4 d-flex align-items-center">
                <div className="p-2 pe-3 border-end border-2 border-light fs-32 me-4">
                  <i className="bi bi-chat-text-fill"></i>
                </div>
                <div>
                  <p className="fs-32 mb-0">222</p>
                  <p>Messages</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="w-100 h-100 text-white bg-success rounded-10 px-3 py-4 d-flex align-items-center">
                <div className="p-2 pe-3 border-end border-2 border-light fs-32 me-4">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <div>
                  <p className="fs-32 mb-0">432</p>
                  <p>Times Bookmarked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Listing */}
        <div className="w-100 p-2 p-sm-3 shadow mb-4">
          <h2 className="fs-22 fw-bold ls-6 mb-4">Listing</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Listing Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Added Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {lists.map((list) => (
                  <tr key={list.id}>
                    <td>{list.name}</td>
                    <td>{list.price}</td>
                    <td>{list.added_date}</td>
                    <td>{list.status}</td>
                    <td className="text-danger">
                      <i className="bi bi-pencil-square"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-3 text-end">
            <button className="btn btn-primary px-4">
              <span className="d-inline-block me-4">More </span>
              <i className="bi bi-arrow-right-circle-fill"></i>
            </button>
          </div>
        </div>
        {/* Message */}
        <div className="w-100 p-2 p-sm-3 shadow mb-4">
          <h2 className="fs-22 fw-bold ls-6 mb-4">Message</h2>
          <div className="w-100 d-flex mb-3">
            <div className="square-75 bg-info me-4 rounded-circle"></div>
            <div>
              <h3 className="fs-18 fw-normal">Mary Smith</h3>
              <p className="mb-1 fs-14">22 Minutes ago</p>
              <p className="fs-14">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias vel, distinctio nemo, sapiente recusandae sunt minima
                nam, quia rerum soluta perferendis iusto ipsa commodi earum
                quidem natus maiores itaque voluptate?
              </p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="square-75 bg-info me-4 rounded-circle"></div>
            <div>
              <h3 className="fs-18 fw-normal">Karl Tyron</h3>
              <p className="mb-1 fs-14">22 Minutes ago</p>
              <p className="fs-14">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias vel, distinctio nemo, sapiente recusandae sunt minima
                nam, quia rerum soluta perferendis iusto ipsa commodi earum
                quidem natus maiores itaque voluptate?
              </p>
            </div>
          </div>
          <div className="py-3 text-end">
            <button className="btn btn-primary px-4">
              <span className="d-inline-block me-4">More </span>
              <i className="bi bi-arrow-right-circle-fill"></i>
            </button>
          </div>
        </div>
        {/* Review */}
        <div className="w-100 p-2 p-sm-3 shadow mb-4">
          <h2 className="fs-22 fw-bold ls-6 mb-4">Review</h2>
          <div className="w-100 d-flex mb-3">
            <div className="square-75 bg-info me-4 rounded-circle"></div>
            <div className="max-width-680">
              <div className="d-flex justify-content-between">
                <div>
                  <h2 className="fs-18 fw-normal text-gray-600">
                    Family House
                  </h2>
                  <h3 className="fs-18 fw-normal">Mary Smith</h3>
                  <p className="mb-1 fs-14">22 Minutes ago</p>
                </div>
                <div>
                  <button className="btn bg-transparent border-none p-0">
                    <i className="bi bi-eye-fill"></i>
                  </button>
                </div>
              </div>
              <p className="fs-14">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias vel, distinctio nemo, sapiente recusandae sunt minima
                nam, quia rerum soluta perferendis iusto ipsa commodi earum
                quidem natus maiores itaque voluptate?
              </p>
              <ReviewStars />
            </div>
          </div>
          <div className="py-3 text-end">
            <button className="btn btn-primary px-4">
              <span className="d-inline-block me-4">More </span>
              <i className="bi bi-arrow-right-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
