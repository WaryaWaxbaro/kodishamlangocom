import { useTranslations } from "next-intl";
import Link from "next/link";

import { formatPrice, unixToDate } from "../utils";

export default function DashboardListing({ listings }) {
  const t = useTranslations("DashboardListing");
  const apartments = listings.slice(0, 5);
  return (
    <div className="w-100 p-2 p-sm-3 shadow mb-4">
      <h2 className="fs-22 fw-bold ls-6 mb-4">{t("properties")}</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">{t("listing_title")}</th>
              <th scope="col">{t("price")}</th>
              <th scope="col">{t("added_date")}</th>
              <th scope="col">{t("status")}</th>
              <th scope="col">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((listing) => (
              <tr key={listing.mId}>
                <td>{listing.title}</td>
                <td>{formatPrice(listing.price)}</td>
                <td>{unixToDate(listing.updatedAt.seconds)}</td>
                <td>
                  {listing.published ? t("published") : t("not_published")}
                </td>
                <td className="text-danger">
                  <Link href={`/admin/my-properties/${listing.mId}`}>
                    <a>
                      <i className="bi bi-pencil-square"></i>
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-3 text-end">
        <Link href="/admin/my-properties">
          <a className="btn btn-primary px-4">
            <span className="d-inline-block me-4">{t("more")} </span>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </a>
        </Link>
      </div>
    </div>
  );
}
