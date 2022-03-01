import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import "../scss/main.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  });

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
