import { createFirebaseApp } from "../firebase/clientApp";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { useRouter } from "next/router";

export default function login() {
  const router = useRouter();
  const auth = getAuth(createFirebaseApp());

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        router.push("/admin");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="max-width-350 mx-auto shadow p-2 p-sm-3 rounded-5 my-5">
      <h1 className="fs-24 text-center mb-3">Login</h1>
      <hr className="bg-dark" />
      <div className="d-grid py-4">
        <button
          onClick={handleGoogleAuth}
          className="btn btn-danger text-light btn-lg d-flex align-items-center justify-content-center mb-4"
        >
          <span className="d-block me-3">
            <i className="bi bi-google"></i>
          </span>
          <span className="d-block">Login with Google</span>
        </button>
        <button className="btn btn-blue text-light btn-lg d-flex align-items-center justify-content-center">
          <span className="d-block me-3">
            <i className="bi bi-facebook"></i>
          </span>
          <span className="d-block">Login with Facebook</span>
        </button>
      </div>
    </div>
  );
}
