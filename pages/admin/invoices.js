import AdminLayout from "../../layout/AdminLayout";
import { useTranslations } from "next-intl";

export default function Invoices() {
  const t = useTranslations("Invoices");
  return (
    <AdminLayout>
      <div className="container-lg">
        <div className="max-width-960 mx-auto shadow rounded-10 my-4 p-2 p-sm-3 p-lg-4">
          {t("no_invoices")}
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
