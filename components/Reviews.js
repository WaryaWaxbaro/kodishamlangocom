import Image from "next/image";
import React from "react";

export default function Reviews() {
  return (
    <div className="w-100 pt-4">
      <div className="w-100 d-flex mb-3">
        <div className="position-relative square-75 overflow-hidden rounded-circle cover-img-img me-4">
          <Image src="/images/cover/ts-5.jpeg" layout="fill" />
        </div>
        <div className="w-100">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <h4 className="fs-16 text-primary">Mary Smith</h4>
              <p className="fs-14">May 30 2020</p>
            </div>
            <div className="d-flex text-primary">
              <div className="me-1">
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="me-1">
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="me-1">
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="me-1">
                <i className="bi bi-star"></i>
              </div>
              <div className="me-1">
                <i className="bi bi-star"></i>
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            aliquam, quam congue dictum luctus, lacus magna congue ante, in
            finibus dui sapien eu dolor. Integer tincidunt suscipit erat, nec
            laoreet ipsum vestibulum sed.
          </p>
        </div>
      </div>
    </div>
  );
}
