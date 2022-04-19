import { useState, useEffect } from "react";
import { createFirebaseApp } from "../firebase/clientApp";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useRouter } from "next/router";
import { useUser } from "../context/userContext";

export default function login() {
  const router = useRouter();
  const auth = getAuth(createFirebaseApp());
  const db = getFirestore(createFirebaseApp());
  const usersRef = collection(db, "users");
  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();

  const [authUser, setAuthUser] = useState(null);
  const { user: currentUser, setUser } = useUser();

  useEffect(() => {
    const updateUser = async () => {
      const { uid, displayName, email, photoURL } = authUser;
      const userDoc = doc(db, "users", uid);
      console.log("***userDoc***", userDoc);
      const docSnap = await getDoc(userDoc);
      console.log("***docSnap***", docSnap);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { loginCount, lastLogin } = docSnap.data();
        const newLoginCount = loginCount + 1;
        const newLastLogin = new Date();
        await updateDoc(doc(usersRef, uid), {
          loginCount: newLoginCount,
          lastLogin: newLastLogin,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
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
  );
}
