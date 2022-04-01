import Image from "next/image";

export default function ProfileCard() {
  return (
    <>
      <div className="d-flex my-4">
        <div className="position-relative square-75 overflow-hidden rounded-circle cover-img-img me-4">
          <Image src="/images/cover/ts-5.jpeg" layout="fill" />
        </div>
        <div>
          <h4 className="fs-16 fw-bold ls-6">Lisa Clark</h4>
          <p className="fs-14">Agent of Property</p>
        </div>
      </div>
      <div>
        <p className="d-flex fs-14">
          <span className="d-block text-primary me-3">
            <i className="bi bi-geo-alt-fill"></i>
          </span>
          <span className="d-block">302 Av Park, New York</span>
        </p>
        <p className="d-flex fs-14">
          <span className="d-block text-primary me-3">
            <i className="bi bi-telephone-fill"></i>
          </span>
          <span className="d-block">(234) 0200 17813</span>
        </p>
        <p className="d-flex fs-14">
          <span className="d-block text-primary me-3">
            <i className="bi bi-envelope-fill"></i>
          </span>
          <span className="d-block">lisa@gmail.com</span>
        </p>
      </div>
    </>
  );
}
