import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Registration() {
  const t = useTranslations("Registration");
  return (
    <div className="container-lg py-4">
      <div className="max-width-680 mx-auto px-3 py-4 shadow-sm rounded-5">
        <h1 className="h2 mb-4">{t("title")}</h1>
        <p className="mb-1">{t("sub_title")}</p>
        <p className="mb-1">
          {t("just")}{" "}
          <Link href="/">
            <a className="text-dark">{t("login")}</a>
          </Link>{" "}
          {t("with_your_google_account")}
        </p>
        <p>{t("content")}</p>
        <ul>
          <li>{t("list_one")}</li>
          <li>{t("list_two")}</li>
          <li>{t("list_three")}</li>
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
