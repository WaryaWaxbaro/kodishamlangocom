import AdminLayout from "../../layout/AdminLayout";
import { useTranslations } from "next-intl";

export default function Payments() {
  const t = useTranslations("Payments");
  return (
    <AdminLayout>
      <div className="container-lg">
        <div className="max-width-960 mx-auto shadow rounded-10 my-4 p-2 p-sm-3 p-lg-4">
          {t("no_payments")}
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
}
