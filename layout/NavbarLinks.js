import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { createFirebaseApp } from "../firebase/clientApp";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../context/userContext";
import Logo from "../components/Logo";

export default function NavbarLinks() {
  const router = useRouter();
  const { pathname } = router;
  const { user: currentUser, setUser, loadingUser, setCurrentUser } = useUser();
  const auth = getAuth(createFirebaseApp());
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        setUser(null);
        setCurrentUser(null);
        sessionStorage.removeItem("token");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
          <div className="d-none h-100 nav-section-width d-lg-flex flex-column flex-lg-row align-items-center justify-content-end justify-content-xl-between ms-xl-auto">
            <ul className="navbar-nav">
              {mainLinks.map((link) => (
                <li key={link.name} className="nav-item ls-1 p-lg-3">
                  <span
                    className={
                      link.url === pathname
                        ? "main-nav-links active"
                        : "main-nav-links"
                    }
                  >
                    <Link href={link.url}>
                      <a>{link.name}</a>
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav align-items-center justify-content-end">
              {currentUser ? (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-transparent nav-dropdown-toggle dropdown-toggle text-nowrap rounded-0 no-shadow-btn fs-14"
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
                        <span className="d-block position-relative square-50 bg-danger rounded-circle overflow-hidden me-3">
                          <Image src={currentUser.photoURL} layout="fill" />
                        </span>
                        <span className="d-block">
                          Hello {currentUser.displayName}
                        </span>
                      </span>
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    {dropdownLinks.map((link) => (
                      <li key={link.name} className="cursor-pointer">
                        {link.name === "Logout" ? (
                          <span
                            onClick={handleSignOut}
                            className="dropdown-item"
                          >
                            {link.name}
                          </span>
                        ) : (
                          <Link href={link.url}>
                            <span className="dropdown-item">{link.name}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item ls-1 p-lg-3">
                  <span className="main-nav-links">
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </span>
                </li>
              )}
              <li className="nav-item">
                <div className="d-flex" style={{ height: "40px" }}>
                  <div className="vr" style={{ opacity: "1" }}></div>
                </div>
              </li>
              <li className="nav-item ls-1 p-lg-3">
                <span className="btn btn-primary rounded-8 dark-links text-nowrap">
                  <Link href="/new-listing">Add Listing</Link>
                </span>
              </li>
            </ul>
          </div>
          <div className="h-100 nav-section-width d-lg-none">
            {currentUser ? (
              <>
                <div className="w-100 mb-5 text-center">
                  <div className="square-96 mx-auto position-relative rounded-circle bg-danger border border-4 border-primary overflow-hidden mb-3">
                    <Image src={currentUser.photoURL} layout="fill" />
                  </div>
                  <p>{currentUser.displayName}</p>
                </div>
                <ul className="list-unstyled px-3">
                  {dropdownLinks.map((link, index) => (
                    <li key={`${link.name}_${index}`} className="mb-2">
                      {link.name === "Logout" ? (
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
                              link.url === pathname
                                ? "dropdown-item active"
                                : "dropdown-item"
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
                  ))}
                </ul>
              </>
            ) : (
              <ul className="list-unstyled px-3">
                <li className="mb-2">
                  <Link href="/login">
                    <a
                      className={
                        pathname === "/login"
                          ? "dropdown-item active"
                          : "dropdown-item"
                      }
                    >
                      <span className="d-flex align-items-center">
                        <span className="d-block me-3">
                          <i className="bi bi-box-arrow-in-right"></i>
                        </span>
                        <span className="d-block">Login</span>
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
            <hr className="mx-3" />
            <ul className="list-unstyled px-3">
              {mainLinks.map((link, index) => (
                <li key={`${link.name}_${index}`} className="mb-2">
                  <Link href={link.url}>
                    <a
                      className={
                        link.url === pathname
                          ? "dropdown-item active"
                          : "dropdown-item"
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
                </li>
              ))}
            </ul>
            <div className="h-40 w-100 my-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mainLinks = [
  {
    name: "Home",
    url: "/",
    icon: "bi bi-house-door-fill",
  },
  {
    name: "For Rent",
    url: "/for-rent",
    icon: "bi bi-card-list",
  },
  {
    name: "For Sale",
    url: "/for-sale",
    icon: "bi bi-card-text",
  },
  {
    name: "Contact",
    url: "/contact",
    icon: "bi bi-envelope-fill",
  },
];

const dropdownLinks = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: "bi bi-speedometer",
  },
  {
    name: "Profile",
    url: "/admin/profile",
    icon: "bi bi-person-fill",
  },
  {
    name: "My properties",
    url: "/admin/my-properties",
    icon: "bi bi-list-ul",
  },
  {
    name: "Favorite Properties",
    url: "/admin/favorite-properties",
    icon: "bi bi-heart-fill",
  },
  {
    name: "Add Property",
    url: "/new-listing",
    icon: "bi bi-plus-circle-fill",
  },
  {
    name: "Payments",
    url: "/admin/payments",
    icon: "bi bi-credit-card-fill",
  },
  {
    name: "Invoices",
    url: "/admin/invoices",
    icon: "bi bi-journals",
  },
  {
    name: "Logout",
    url: "/",
    icon: "bi bi-box-arrow-in-left",
  },
];
