import { useState, useEffect } from "react";
import { db, auth } from "../firebase/clientApp";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import Loader from "../components/Loader";

export default function login() {
  const router = useRouter();
  const usersRef = collection(db, "users");
  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();

  const [authUser, setAuthUser] = useState(null);
  const { loadingUser, setUser, setCurrentUser } = useUser();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      const { uid, displayName, email, photoURL } = authUser;
      const userDoc = doc(db, "users", uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setCurrentUser({ ...docSnap.data(), uid });
        await updateDoc(doc(usersRef, uid), {
          loginCount: increment(1),
          lastLogin: new Date(),
        });
      } else {
        // doc.data() will be undefined in this case
        await setDoc(doc(usersRef, uid), {
          fullName: displayName,
          email,
          displayName,
          photoURL,
          loginCount: 1,
          lastLogin: new Date(),
        });
      }
    };
    if (authUser) updateUser();
  }, [authUser]);

  const handleGoogleAuth = async () => {
    signInWithPopup(auth, gProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setAuthUser(user);
        setUser(user);
        sessionStorage.setItem("token", token);
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

  const handleFacebookAuth = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, fProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        sessionStorage.setItem("token", accessToken);
        // ...
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
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  return (
    <>
      {loadingUser ? (
        <Loader />
      ) : (
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
            <button
              onClick={handleFacebookAuth}
              className="btn btn-blue text-light btn-lg d-flex align-items-center justify-content-center"
            >
              <span className="d-block me-3">
                <i className="bi bi-facebook"></i>
              </span>
              <span className="d-block">Login with Facebook</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
