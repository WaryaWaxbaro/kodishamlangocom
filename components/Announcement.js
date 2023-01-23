import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Announcement(props) {
  const { t, locale } = props;
  const [show, setShow] = useState(false);
  useEffect(() => {
    const cookie = getCookie("kiro-ann");
    if (!cookie) {
      setShow(true);
      setCookie("kiro-ann", "255sf89df32468", 1);
    }
  }, []);
  const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        //return c.substring(name.length, c.length);
        return true;
      }
    }
    //return "";
    return false;
  };
  const closeDialog = () => {
    setShow(false);
    setCookie("kiro-ann", "255sf89df32468", 1);
  };

  return (
    <>
      {show && (
        <div
          onClick={closeDialog}
          className="position-fixed start-0 end-0 top-0 bottom-0 bg-dark bg-opacity-50 z-to-1400 pt-3 cursor-pointer"
        >
          <div className="max-width-680 mx-auto bg-primary p-3 p-sm-2 position-relative">
            <button className="btn btn-transparent p-1 text-light rounded-circle position-absolute top-0 end-0">
              <i className="bi bi-x-circle-fill"></i>
            </button>
            <div>
              <h2 className="fs-18 fw-bold text-center">{t("title")}</h2>
              <h3 className="fw-bold fs-16 mb-1">{t("about_ai")}</h3>
              <p className="mb-1">
                {t("ai_info_1")}{" "}
                <a
                  href="https://ebarasho.com/"
                  target="_blank"
                  rel="no-referer"
                  className="text-dark fw-bold"
                >
                  {t("ai_info_2")}
                </a>
              </p>
              <hr />
              <p className="lh-sm fw-s mb-1">{t("sub_title")}</p>
              <p>
                {t("sub_title_2")}
                <a
                  href={locale === "en" ? "/en/contact" : "/contact"}
                  className="text-decoration-underline text-dark fw-bold ms-2"
                >
                  {t("contact_us")}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
