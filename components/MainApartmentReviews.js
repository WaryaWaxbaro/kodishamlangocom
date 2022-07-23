import { useTranslations } from "next-intl";
import { unixToDate } from "../utils";
import ReviewStars from "./ReviewStars";

export default function MainApartmentReviews({ getUserName, review }) {
  const t = useTranslations("Reviews");
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="pe-3">{t("reviewer")}</td>
            <td>{review.name}</td>
          </tr>
          <tr>
            <td className="pe-3">{t("public")}</td>
            <td>{review.isPublished ? t("yes") : t("no")}</td>
          </tr>
          <tr>
            <td className="pe-3">{t("rating")}</td>
            <td>
              <ReviewStars rating={review.rating} />
            </td>
          </tr>
          <tr>
            <td className="pe-3">{t("reviews")}</td>
            <td>{review.review}</td>
          </tr>
          <tr>
            <td className="pe-3">{t("sent_at")}</td>
            <td>{unixToDate(review.createdAt.seconds)}</td>
          </tr>
          <tr>
            <td colSpan={5}>
              <hr className="my-2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
