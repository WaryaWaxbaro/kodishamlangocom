import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Script from "next/script";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";
import somCities from "../data/somCities";
import Announcement from "../components/Announcement";

const apartmentPages = [
  "for-rent",
  "for-sale",
  "holiday",
  "plots",
  "short-stay",
  "cities",
  "apartments",
];
const apt = {
  "for-rent": "rent",
  "for-sale": "sale",
  "short-stay": "short_stay",
  holiday: "holiday",
  plots: "plots",
  cities: "cities",
  apartments: "apartments",
};

export default function MainLayout(props) {
  const { children } = props;
  const router = useRouter();
  const { pathname, query } = router;
  const { locale } = router;
  const t = useTranslations("Layout");
  const t_listing = useTranslations("ListingPage");
  const t_announcement = useTranslations("Announcement");
  let description = somCities.join(", ");

  let translationPage = apartmentPages.indexOf(pathname.substring(1));

  return (
    <>
      <Head>
        {pathname === "/" ||
          (!pathname.includes("[slug]") && translationPage < 0 && (
            <>
              <title>{t("title")}</title>
              <meta
                property="description"
                content={`${t("description")} ${description}`}
              />
              <meta property="og:title" content={t("title")} />
              <meta
                property="og:description"
                content={`${t("description")} ${description}`}
              />
            </>
          ))}

        {translationPage >= 0 && (
          <>
            <title>
              {t_listing(apt[apartmentPages[translationPage]] + ".title")}
            </title>
            <meta
              property="description"
              content={`${t_listing(
                apt[apartmentPages[translationPage]] + ".description"
              )}`}
            />
            <meta
              property="og:title"
              content={t_listing(
                apt[apartmentPages[translationPage]] + ".title"
              )}
            />
            <meta
              property="og:description"
              content={`${t_listing(
                apt[apartmentPages[translationPage]] + ".description"
              )}`}
            />
          </>
        )}
        <meta property="keyword" content="Gurikiro.com" />
        <meta property="author" content="Gurikiro.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:locale" content={locale} />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="/images/gurikiro_logo_dark.png" />
        <meta property="og:site_name" content="Gurikiro.com" />
        <meta property="og:image" content="/images/gurikiro_logo_dark.png" />
      </Head>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-W2STP30D1E" />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-W2STP30D1E');
                      `,
            }}
          />
        </>
      )}
      <Navbar />
      <main className="min-80vh">
        <ToastContainer />
        {children}
      </main>
      <AppFooter />
      <Announcement t={t_announcement} locale={locale} />
    </>
  );
}
