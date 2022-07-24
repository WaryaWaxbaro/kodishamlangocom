import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("AboutUs");
  return (
    <div className="container-lg py-4">
      <div className="max-width-680 mx-auto px-3 py-4 shadow-sm rounded-5">
        <h1 className="h3 mb-3">{t("title")}</h1>
        <p>{t("content")}</p>
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
