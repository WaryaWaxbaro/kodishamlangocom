import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../layout/MainLayout";
import UserProvider from "../context/userContext";
import "../scss/main.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  });

  return (
    <UserProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </UserProvider>
  );
}

export default MyApp;
