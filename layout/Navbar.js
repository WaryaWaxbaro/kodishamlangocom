import Link from "next/link";
import { Router, useRouter } from "next/router";
import Logo from "../components/Logo";

export default function Navbar({ navbarBg }) {
  const { pathname } = useRouter();
  const commonStyles = {
    nav: "navbar navbar-light navbar-expand-lg fixed-top flex-nowrap z-to-150 shadow-sm transition-2s",
    menu: "navbar-toggler border-2 outline-none no-shadow-btn p-1",
  };
  return (
    <nav
      className={
        navbarBg
          ? `${commonStyles.nav} bg-primary`
          : `${commonStyles.nav} bg-white`
      }
    >
      <div className="container-lg">
        <Logo
          imgUrl={
            navbarBg
              ? "/images/logo_light_door.png"
              : "/images/logo_orange_door.png"
          }
        />
        <button
          className={
            navbarBg
              ? `${commonStyles.menu} border-dark`
              : `${commonStyles.menu} border-primary`
          }
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
          <div className="offcanvas-header bg-primary p-2">
            <Logo imgUrl="/images/logo_dark_door.png" />
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {navbarLinks.map((link) => (
                <li key={link.name} className="nav-item p-lg-2">
                  <span
                    className={
                      link.url === pathname
                        ? "main-nav-links active"
                        : "main-nav-links"
                    }
                  >
                    <Link href={link.url}>{link.name}</Link>
                  </span>
                </li>
              ))}
              <li className="nav-item d-flex align-items-center px-lg-2">
                <button className="btn btn-dark rounded-pill no-shadow-btn fs-14 h-34 w-lg-100 px-lg-4 my-3 my-lg-0">
                  Login
                </button>
              </li>
              <li className="nav-item d-flex align-items-center">
                <button className="btn btn-dark rounded-pill no-shadow-btn fs-14 h-34 w-lg-100 px-lg-4">
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

const navbarLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Rent",
    url: "/houses-for-rent",
  },
  {
    name: "Buy",
    url: "/houses-for-sell",
  },
  {
    name: "Short stay",
    url: "/short-stay",
  },
];
