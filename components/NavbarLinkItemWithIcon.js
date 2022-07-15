import Link from "next/link";

export default function NavbarLinkItemWithIcon({
  link,
  isBtn,
  handleSignOut,
  pathname,
}) {
  return (
    <li className="mb-2">
      {isBtn ? (
        <a onClick={handleSignOut} className="dropdown-item">
          <span className="d-flex align-items-center">
            <span className="d-block me-3">
              <i className={link.icon}></i>
            </span>
            <span className="d-block">{link.name}</span>
          </span>
        </a>
      ) : (
        <Link href={link.url}>
          <a
            className={
              link.url === pathname ? "dropdown-item active" : "dropdown-item"
            }
          >
            <span className="d-flex align-items-center">
              <span className="d-block me-3">
                <i className={link.icon}></i>
              </span>
              <span className="d-block">{link.name}</span>
            </span>
          </a>
        </Link>
      )}
    </li>
  );
}
