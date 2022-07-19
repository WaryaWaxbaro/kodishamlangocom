import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";

export default function AdminLayout({ children }) {
  const { currentUser, loadingUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      setTimeout(() => {
        if (!currentUser) {
          router.push("/login");
        }
      }, 1000);
    }
  }, [loadingUser]);

  return (
    <div className="min-80vh">
      {currentUser ? (
        <>
          {currentUser.isBlocked ? (
            <div
              className="w-100 h-50 d-flex align-items-center justify-content-center"
              style={{ marginTop: "150px" }}
            >
              <div className="text-center p-4 border border-danger rounded-5">
                Please contact the Admin to check your account
              </div>
            </div>
          ) : (
            children
          )}
        </>
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
