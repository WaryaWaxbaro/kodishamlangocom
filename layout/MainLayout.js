import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";

export default function MainLayout(props) {
  const { children, title } = props;
  const router = useRouter();
  const { locale } = router.query;
  return (
    <>
      <Head>
        <title>
          {title || "Gurikiro.com - Real Estate in the heart of the city"}
        </title>
        <meta property="description" content="" />
        <meta property="keyword" content="Gurikiro.com" />
        <meta property="author" content="Gurikiro.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:locale" content={locale} />
        <meta property="og:description" content="" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            title || "Gurikiro.com - Real Estate in the heart of the city"
          }
        />
        <meta property="og:url" content="/images/gurikiro_logo_dark.png" />
        <meta property="og:site_name" content="Gurikiro.com" />
        <meta property="og:image" content="/images/gurikiro_logo_dark.png" />
      </Head>
      <Navbar />
      <main className="min-80vh">
        <ToastContainer />
        {children}
      </main>
      <AppFooter />
    </>
  );
}
