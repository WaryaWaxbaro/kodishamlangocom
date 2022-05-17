import React from "react";

export default function DashboardMessage() {
  return (
    <div className="w-100 p-2 p-sm-3 shadow mb-4">
      <h2 className="fs-22 fw-bold ls-6 mb-4">Message</h2>
      <div className="w-100 d-flex mb-3">
        <div className="square-75 bg-info me-4 rounded-circle"></div>
        <div>
          <h3 className="fs-18 fw-normal">Mary Smith</h3>
          <p className="mb-1 fs-14">22 Minutes ago</p>
          <p className="fs-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            vel, distinctio nemo, sapiente recusandae sunt minima nam, quia
            rerum soluta perferendis iusto ipsa commodi earum quidem natus
            maiores itaque voluptate?
          </p>
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="square-75 bg-info me-4 rounded-circle"></div>
        <div>
          <h3 className="fs-18 fw-normal">Karl Tyron</h3>
          <p className="mb-1 fs-14">22 Minutes ago</p>
          <p className="fs-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            vel, distinctio nemo, sapiente recusandae sunt minima nam, quia
            rerum soluta perferendis iusto ipsa commodi earum quidem natus
            maiores itaque voluptate?
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
  );
}
