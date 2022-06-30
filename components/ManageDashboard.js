import Link from "next/link";

export default function ManageDashboard({ dashboardCount }) {
  return (
    <div className="w-100 p-2 p-sm-3 shadow mb-4">
      <h1 className="fs-22 fw-bold ls-6 mb-4">Manage Dashboard</h1>
      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <Link href="/admin/my-properties">
            <div className="w-100 h-100 text-white bg-danger rounded-10 px-3 py-4 d-flex align-items-center">
              <div className="p-2 pe-3 border-end border-2 border-light fs-32 me-4">
                <i className="bi bi-list-ul"></i>
              </div>
              <div>
                <p className="fs-32 mb-0">{dashboardCount.properties}</p>
                <p className="mb-2">Published Property</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <Link href="/admin/reviews">
            <div className="w-100 h-100 text-white bg-warning rounded-10 px-3 py-4 d-flex align-items-center">
              <div className="p-2 pe-3 border-end border-2 border-light fs-32 me-4">
                <i className="bi bi-star-fill"></i>
              </div>
              <div>
                <p className="fs-32 mb-0">{dashboardCount.reviews}</p>
                <p>Total Reviews</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <Link href="/admin/contact-requests">
            <div className="w-100 h-100 text-white bg-blue rounded-10 px-3 py-4 d-flex align-items-center">
              <div className="p-2 pe-3 border-end border-2 border-light fs-32 me-4">
                <i className="bi bi-chat-text-fill"></i>
              </div>
              <div>
                <p className="fs-32 mb-0">{dashboardCount.messages}</p>
                <p>Messages</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
