import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Script from "next/script";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";
import somCities from "../data/somCities";

export default function MainLayout(props) {
  const { children } = props;
  const router = useRouter();
  const { locale } = router;
  const t = useTranslations("Layout");
  let description = somCities.join(", ");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta
          property="description"
          content={`${t("description")} ${description}`}
        />
        <meta property="keyword" content="Gurikiro.com" />
        <meta property="author" content="Gurikiro.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:locale" content={locale} />
        <meta
          property="og:description"
          content={`${t("description")} ${description}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("title")} />
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
    </>
  );
}
