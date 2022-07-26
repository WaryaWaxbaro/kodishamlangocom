import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SiteOwnerLayout({ children }) {
  const { currentUser, loadingUser } = useUser();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (!loadingUser) {
      if (!currentUser) {
        router.push("/login");
      } else {
        if (!currentUser.roles.includes("admin")) {
          router.push("/admin");
        }
      }
    }
  }, [loadingUser]);

  return (
    <div className="min-80vh">
      <Head>
        <title>Site Owner | Gurikiro.com</title>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      {currentUser && currentUser.roles?.includes("admin") ? (
        <div className="container-xl">{children}</div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ marginTop: "150px" }}
        >
          <div
            className="d-flex justify-content-center"
            style={{ width: "100px", height: "100px" }}
          >
            <div className="spinner-border w-100 h-100" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
