import Logo from "../components/Logo";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavbarLinks() {
  const { pathname } = useRouter();
  return (
    <div className="container-xl h-100">
      <Logo imgUrl="/images/logo_dark_door.png" />
      <button
        className="navbar-toggler border-2 outline-none no-shadow-btn p-1"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <i className="bi bi-list text-dark fs-28"></i>
      </button>
      <div
        className="offcanvas offcanvas-start drawer"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header bg-primary p-2 h-104">
          <Logo imgUrl="/images/logo_dark_door.png" />
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="h-100 nav-section-width d-flex flex-column flex-lg-row align-items-center justify-content-end justify-content-xl-between ms-xl-auto">
            <ul className="navbar-nav">
              <li className="nav-item ls-1 p-lg-3">
                <span
                  className={
                    pathname === "/"
                      ? "main-nav-links active"
                      : "main-nav-links"
                  }
                >
                  <Link href="/">Home</Link>
                </span>
              </li>
              <li className="nav-item ls-1 p-lg-3">
                <span
                  className={
                    pathname === "/listing"
                      ? "main-nav-links active"
                      : "main-nav-links"
                  }
                >
                  <Link href="/listing">Listing</Link>
                </span>
              </li>
              <li className="nav-item ls-1 p-lg-3">
                <span
                  className={
                    pathname === "/property"
                      ? "main-nav-links active"
                      : "main-nav-links"
                  }
                >
                  <Link href="/property">Property</Link>
                </span>
              </li>
              <li className="nav-item ls-1 p-lg-3">
                <span
                  className={
                    pathname === "/contact"
                      ? "main-nav-links active"
                      : "main-nav-links"
                  }
                >
                  <Link href="/contact">Contact</Link>
                </span>
              </li>
            </ul>
            <ul className="navbar-nav align-items-center justify-content-end">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-transparent nav-dropdown-toggle dropdown-toggle text-nowrap rounded-0 no-shadow-btn"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span
                    className="d-inline-block"
                    style={{ marginTop: "10px" }}
                  >
                    <span className="d-flex align-items-center">
                      <span className="d-block square-50 bg-danger rounded-circle me-3"></span>
                      <span className="d-block">Hello Abdishakur!</span>
                    </span>
                  </span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Add property
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Edit profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Payments
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Log Out
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <div className="d-flex" style={{ height: "40px" }}>
                  <div className="vr" style={{ opacity: "1" }}></div>
                </div>
              </li>
              <li className="nav-item ls-1 p-lg-3">
                <span className="btn btn-primary rounded-8 dark-links text-nowrap">
                  <Link href="/contact">Add Listing</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
