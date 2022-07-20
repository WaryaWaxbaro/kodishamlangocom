import { useEffect } from "react";
import { NextIntlProvider } from "next-intl";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

import MainLayout from "../layout/MainLayout";
import UserProvider from "../context/userContext";
import "../scss/main.scss";
import msg from "../locales/so.json";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  let { messages } = pageProps;
  if (!messages) {
    messages = msg;
  }

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  });

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <UserProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </UserProvider>
    </NextIntlProvider>
  );
}

export default MyApp;
