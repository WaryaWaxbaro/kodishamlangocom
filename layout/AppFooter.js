import Link from "next/link";
import React from "react";
import Logo from "../components/Logo";

export default function AppFooter() {
  return (
    <footer className="pt-5 pb-3 bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="max-width-350 mx-auto m-md-0">
              <Logo imgUrl="/images/logo_orange_door.png" />
            </div>
            <div className="mt-4 text-light text-center-md">
              <p className="d-flex align-items-center justify-content-center justify-content-md-start ms-md-2">
                <span className="d-block square-25 me-2">
                  <i className="bi bi-telephone-fill text-light fs-20"></i>
                </span>
                <a
                  href="tel:0722670385"
                  rel="no-referer"
                  className="text-light d-inline-block"
                >
                  0722670385
                </a>
              </p>
              <p className="d-flex align-items-center justify-content-center justify-content-md-start ms-md-2">
                <span className="d-block square-25 me-2">
                  <i className="bi bi-envelope-fill text-light fs-20"></i>
                </span>
                <a
                  href="mailto: info@kodishamlango.com"
                  rel="no-referer"
                  className="text-light d-inline-block"
                >
                  info@kodishamlango.com
                </a>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <ul className="list-unstyled text-center mt-4">
              {footerLinks.map((link) => (
                <li key={link.name} className="footer-links">
                  <Link href={link.url}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-12 mt-3">
            <hr className="bg-light" />
            <div className="mt-4">
              <p className="d-none text-center">
                <span className="d-block">
                  Rent, Buy, Sell Real Estate Properties, Business Properties,
                  Housing Projects, Apartments, Flats, Homes, Houses, Plots for
                  free across Kenya. Kodishamlango.com provides easy way to
                  rent, buy and sell your properties.
                </span>
                <span className="d-block">
                  Kodisha, Nunua, Uza Ghorofa, Magorofa, Nyumba bila malipo kote
                  nchini Kenya. Kodishamlango.com hutoa njia rahisi ya
                  kukodisha, kununua na kuuza mali yako.
                </span>
              </p>
              <p className="text-light text-center fs-12 footer-links">
                Copyright &copy; {new Date().getFullYear()}{" "}
                <Link href="/">Kodishamlango.com</Link> All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinks = [
  {
    name: "Home page",
    url: "/",
  },
  {
    name: "Homes for Rent",
    url: "/houses-for-rent",
  },
  {
    name: "Buy home",
    url: "/houses-for-sell",
  },
  {
    name: "Short stay (Holiday)",
    url: "/short-stay",
  },
  {
    name: "New Advertisement",
    url: "/new-advertisement",
  },
  {
    name: "About us",
    url: "/about-us",
  },
  {
    name: "Contact",
    url: "/contact-us",
  },
  {
    name: "Terms and Conditions",
    url: "/terms-and-conditions",
  },
  {
    name: "Privacy",
    url: "/privacy",
  },
  {
    name: "How to register",
    url: "/how-to-register",
  },
];
