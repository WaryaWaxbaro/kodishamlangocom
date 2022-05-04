import Image from "next/image";

export default function ProfileCard({ profile, profileImageUrl }) {
  if (!profile) {
    return <div>No Profile</div>;
  }
  return (
    <>
      <div className="d-flex my-4">
        <div className="position-relative square-75 overflow-hidden rounded-circle cover-img-img me-4">
          {profileImageUrl ? (
            <Image src={profileImageUrl} layout="fill" />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center rounded-circle border border-gray-300">
              <i className="bi bi-person-circle fs-24"></i>
            </div>
          )}
        </div>
        <div>
          <h4 className="fs-16 fw-bold ls-6">{profile.name}</h4>
          <p className="fs-14">{profile.title}</p>
        </div>
      </div>
      <div>
        <p className="d-flex fs-14">
          <span className="d-block text-primary me-3">
            <i className="bi bi-geo-alt-fill"></i>
          </span>
          <span className="d-block">{profile.address}</span>
        </p>
        <p className="d-flex fs-14">
          <span className="d-block text-primary me-3">
            <i className="bi bi-telephone-fill"></i>
          </span>
          <span className="d-block">{profile.phone}</span>
        </p>
        <p className="d-flex fs-14">
          <span className="d-block text-primary me-3">
            <i className="bi bi-envelope-fill"></i>
          </span>
          <span className="d-block">{profile.email}</span>
        </p>
        <p className="d-flex fs-14">
          <span className="d-block text-primary me-3">
            <i className="bi bi-info-circle"></i>
          </span>
          <span className="d-block">{profile.intro}</span>
        </p>
      </div>
    </>
  );
}
