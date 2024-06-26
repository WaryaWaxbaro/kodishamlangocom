import Link from "next/link";
import { useTranslations } from "next-intl";
import Logo from "../components/Logo";

export default function AppFooter() {
  const t = useTranslations("Navigations");
  return (
    <footer className="pt-5 bg-dark">
      <div className="container mb-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="max-width-350">
              <Logo imgUrl="/images/gurikiro_logo_light.png" />
            </div>
            <div className="max-width-350 text-light my-4">
              <p>{t("footer_paragraph")}</p>
            </div>
            <div className="mt-4 text-light text-center-md">
              <p className="d-flex align-items-center">
                <span className="d-block square-25 me-2">
                  <i className="bi bi-envelope-fill text-light"></i>
                </span>
                <a
                  href="mailto: info@gurikiro.com"
                  rel="no-referer"
                  className="text-light d-inline-block"
                >
                  info@gurikiro.com
                </a>
              </p>
            </div>
            <div className="mt-2 text-light text-center-md">
              <p className="d-flex align-items-center">
                <span className="d-block square-25 me-2">
                  <i className="bi bi-whatsapp"></i>
                </span>
                <a
                  href="https://wa.me/358465409585?text=Hello%20Gurikiro"
                  rel="no-referer"
                  className="text-light d-inline-block"
                >
                  Whatsapp
                </a>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 col-lg-6">
                <ul className="list-unstyled mb-2">
                  {footerLinks.map((link) => (
                    <li
                      key={link.name}
                      className="footer-links light-links-primary mb-1 p-1 py-lg-2"
                    >
                      <Link href={link.url}>{t(`${link.t_name}`)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-12 col-lg-6">
                <ul className="list-unstyled">
                  {footerLinksSm.map((link) => (
                    <li
                      key={link.name}
                      className="footer-links light-links-primary mb-1 p-1 py-lg-2"
                    >
                      <Link href={link.url}>{t(`${link.t_name}`)}</Link>
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
                  {t("copy_right")} &copy; {new Date().getFullYear()}{" "}
                  <Link href="/">Gurikiro.com</Link>.{" "}
                  <span className="d-inline-block ms-2">
                    {t("all_rights_reserved")}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="w-100 h-100 d-flex align-items-center justify-content-md-end">
                <ul className="list-unstyled d-flex">
                  <li className="me-3">
                    <a
                      href="https://wa.me/358465409585?text=Hello%20Gurikiro"
                      rel="no-referer"
                      className="whatsapp-icon d-inline-block text-decoration-none"
                    >
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </li>
                  <li className="me-3">
                    <a
                      href="mailto: info@gurikiro.com"
                      rel="no-referer"
                      className="facebook-icon d-inline-block text-decoration-none"
                    >
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li className="me-3">
                    <a
                      href="mailto: info@gurikiro.com"
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
    t_name: "home",
    url: "/",
  },
  {
    name: "For Rent",
    t_name: "for_rent",
    url: "/for-rent",
  },
  {
    name: "For Sale",
    t_name: "for_sale",
    url: "/for-sale",
  },
  {
    name: "Short stay (Holiday)",
    t_name: "short_stay",
    url: "/short-stay",
  },
  {
    name: "New Advertisement",
    t_name: "new_advertisement",
    url: "/new-listing",
  },
];

const footerLinksSm = [
  {
    name: "About us",
    t_name: "about_us",
    url: "/about-us",
  },
  {
    name: "Contact Us",
    t_name: "contact_us",
    url: "/contact",
  },
  {
    name: "Terms and Conditions",
    t_name: "terms_and_conditions",
    url: "/terms",
  },
  {
    name: "Privacy",
    t_name: "privacy",
    url: "/privacy",
  },
  {
    name: "How to register",
    t_name: "how_to_register",
    url: "/registration",
  },
];
