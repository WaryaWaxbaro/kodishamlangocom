import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import HeadingWithLine from "../components/HeadingWithLine";
import AppContact from "../components/AppContact";

export default function Contact() {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });
  const t = useTranslations("Contact");
  return (
    <>
      <header className="w-100 h-300 position-relative cover-img-center-img">
        <Image
          src="/images/house-frontgate.webp"
          alt="contact us"
          layout="fill"
        />
        <div
          className="position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center z-to-5"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
        >
          <h1 className="text-light fw-bold fs-32 ls-6">{t("title")}</h1>
        </div>
      </header>
      <div className="w-100">
        <div className="container-lg">
          <div className="w-100 shadow p-3 border border-gray-300 my-5">
            <h2 className="mb-2 fs-18 fw-bold text-uppercase mb-3">
              {t("our_location")}
            </h2>
            <div className="w-100 height-350">
              <MapWithNoSSR />
            </div>
          </div>
          <div className="w-100 my-4">
            <div className="row">
              <div className="col-12 col-md-7 col-xl-8 mb-4">
                <h2 className="mb-2 fs-18 fw-bold text-uppercase">
                  {t("title")}
                </h2>
                <AppContact />
              </div>
              <div className="col-12 col-md-5 col-xl-4 mb-4">
                <div className="w-100 h-100 h-md-450 position-relative">
                  <div className="position-absolute start-0 top-0 w-100 h-100">
                    <div className="w-100 h-100 position-relative cover-img-center-img">
                      <Image
                        src="/images/customer_care.jpeg"
                        alt={t("title")}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div
                    className="position-absolute start-0 top-0 w-100 h-100"
                    style={{ backgroundColor: "rgba(32,51,100,0.75)" }}
                  ></div>
                  <div className="w-100 h-100 p-3 position-relative z-to-5">
                    <HeadingWithLine
                      text={t("contact_details")}
                      classNames="fw-bold text-light fs-18 mb-4 text-uppercase ls-6 mb-5"
                    />
                    <p className="text-light fs-14 ls-6">
                      {t("contact_instruction")}
                    </p>
                    <div className="py-3 text-light fs-14">
                      <p className="mb-2 d-flex">
                        <span className="d-block me-3">
                          <i className="bi bi-geo-alt-fill"></i>
                        </span>
                        <span className="d-block">Suuqa Xoolaha</span>
                      </p>
                      <p className="mb-2 d-none">
                        <span className="d-block me-3">
                          <i className="bi bi-telephone-fill"></i>
                        </span>
                        <span className="d-block">+252 90 1231 234</span>
                      </p>
                      <p className="mb-2 d-flex">
                        <span className="d-block me-3">
                          <i className="bi bi-envelope-fill"></i>
                        </span>
                        <span className="d-block">info@gurikiro.com</span>
                      </p>
                      <p className="mb-2 d-flex">
                        <span className="d-block me-3">
                          <i className="bi bi-clock-fill"></i>
                        </span>
                        <span className="d-block">24 {t("hours")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
