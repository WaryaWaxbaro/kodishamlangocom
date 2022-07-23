import { useTranslations } from "next-intl";
import { unixToDate } from "../utils";

export default function MainApartmentContacts({ contactRequest }) {
  const t = useTranslations("ContactRequests");
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="pe-3">{t("requested_by")}</td>
            <td>{contactRequest.name}</td>
          </tr>
          <tr>
            <td className="pe-3">{t("phone")}</td>
            <td>{contactRequest.phone}</td>
          </tr>
          <tr>
            <td className="pe-3">{t("property_type")}</td>
            <td>{contactRequest.listingType}</td>
          </tr>
          <tr>
            <td className="pe-3">{t("message")}</td>
            <td>{contactRequest.message}</td>
          </tr>
          <tr>
            <td className="pe-3">{t("submitted_at")}</td>
            <td>{unixToDate(contactRequest.createdAt.seconds)}</td>
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
