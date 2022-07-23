import { useTranslations } from "next-intl";
import { unixToDate } from "../utils";

export default function MainContacts({ contacts }) {
  const t = useTranslations("ContactForm");
  return (
    <div className="w-100 my-4">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>{t("phone")}</th>
              <th>{t("message")}</th>
              <th>{t("sent_at")}</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.mId}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.message}</td>
                <td>{unixToDate(contact.createdAt.seconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
