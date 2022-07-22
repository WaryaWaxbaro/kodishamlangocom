import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { timeSince } from "../utils";

export default function DashboardMessage({ contactRequests }) {
  const t = useTranslations("DashboardMessage");
  const timeago = useTranslations("TimeAgo");
  const router = useRouter();
  const { locale } = router;
  const [updateTimeAgo, setUpdateTimeAgo] = useState({
    years: timeago("years"),
    months: timeago("months"),
    days: timeago("days"),
    hours: timeago("hours"),
    minutes: timeago("minutes"),
    seconds: timeago("seconds"),
    and: timeago("and"),
  });

  useEffect(() => {
    setUpdateTimeAgo({
      years: timeago("years"),
      months: timeago("months"),
      days: timeago("days"),
      hours: timeago("hours"),
      minutes: timeago("minutes"),
      seconds: timeago("seconds"),
      and: timeago("and"),
    });
  }, [locale]);
  return (
    <div className="w-100 p-2 p-sm-3 shadow mb-4">
      <h2 className="fs-22 fw-bold ls-6 mb-4">{t("contact_requests")}</h2>
      {contactRequests.length > 0 ? (
        <div>
          {contactRequests.map((contactRequest, index) => (
            <div key={index} className="w-100 d-flex mb-3">
              <div className="square-75 d-flex align-items-center justify-content-center bg-info me-4 rounded-circle">
                {index + 1}
              </div>
              <div>
                <h3 className="fs-18 fw-normal">{contactRequest.name}</h3>
                <p className="mb-1 fs-14">
                  {timeSince(
                    new Date(contactRequest.createdAt.seconds * 1000),
                    updateTimeAgo
                  )}
                </p>
                <p className="fs-14">{contactRequest.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>{t("no_contact_result")}</div>
      )}
      <div className="py-3 text-end">
        <Link href="/admin/contact-requests">
          <a className="btn btn-primary px-4">
            <span className="d-inline-block me-4">{t("more")}</span>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </a>
        </Link>
      </div>
    </div>
  );
}
