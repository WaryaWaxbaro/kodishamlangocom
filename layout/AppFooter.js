import Link from "next/link";
import React from "react";
import Logo from "../components/Logo";

export default function AppFooter() {
  return (
    <footer className="pt-5 bg-dark">
      <div className="container mb-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="max-width-350">
              <Logo imgUrl="/images/logo_orange_door.png" />
            </div>
            <div className="max-width-350 text-light my-4">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="mt-4 text-light text-center-md">
              <p className="d-flex align-items-center">
                <span className="d-block square-25 me-2">
                  <i className="bi bi-telephone-fill text-light"></i>
                </span>
                <a
                  href="tel:0722670385"
                  rel="no-referer"
                  className="text-light d-inline-block"
                >
                  0722670385
                </a>
              </p>
              <p className="d-flex align-items-center">
                <span className="d-block square-25 me-2">
                  <i className="bi bi-envelope-fill text-light"></i>
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
            <div className="row">
              <div className="col-12 col-lg-6">
                <ul className="list-unstyled">
                  {footerLinks.map((link) => (
                    <li
                      key={link.name}
                      className="footer-links light-links-primary mb-2 p-1 py-lg-2"
                    >
                      <Link href={link.url}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-12 col-lg-6">
                <ul className="list-unstyled">
                  {footerLinksSm.map((link) => (
                    <li
                      key={link.name}
                      className="footer-links light-links-primary mb-2 p-1 py-lg-2"
                    >
                      <Link href={link.url}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 bg-black border-top border-gray-300 py-2 py-md-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mb-3 mb-md-4">
              <div className="h-100 w-100 d-flex align-items-center">
                <p className="mb-0 text-light fs-12 footer-links light-links-primary">
                  Copyright &copy; {new Date().getFullYear()}{" "}
                  <Link href="/">Kodishamlango.com</Link>.{" "}
                  <span className="d-inline-block ms-2">
                    All rights reserved
                  </span>
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="w-100 h-100 d-flex align-items-center justify-content-md-end">
                <ul className="list-unstyled d-flex">
                  <li className="me-3">
                    <a
                      href="mailto: info@kodishamlango.com"
                      rel="no-referer"
                      className="whatsapp-icon d-inline-block text-decoration-none"
                    >
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </li>
                  <li className="me-3">
                    <a
                      href="mailto: info@kodishamlango.com"
                      rel="no-referer"
                      className="facebook-icon d-inline-block text-decoration-none"
                    >
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li className="me-3">
                    <a
                      href="mailto: info@kodishamlango.com"
                      rel="no-referer"
                      className="twitter-icon d-inline-block text-decoration-none"
                    >
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
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
];

const footerLinksSm = [
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
