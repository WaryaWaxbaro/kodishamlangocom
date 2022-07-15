import { createFirebaseApp } from "././../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";

export default function AdminLayout({ children }) {
  const auth = getAuth(createFirebaseApp());
  const { user, loadingUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    /*     let token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } */
    if (!loadingUser) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [loadingUser]);

  return (
    <div className="min-80vh">
      {user ? (
        children
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
