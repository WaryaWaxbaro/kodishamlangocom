import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import nookies from "nookies";
import { db, auth } from "../firebase/clientApp";
import { UserModel } from "../models";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen authenticated user
    //const unsubscriber = onAuthStateChanged(auth, async (user) => {
    const unsubscriber = onIdTokenChanged(auth, async (user) => {
      try {
        if (user) {
          const token = await user.getIdToken();
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          //const userDoc = await firebase.firestore().doc(`users/${uid}`).get();
          const loggedInUser = await new UserModel({ id: uid }).getOne();
          const userDoc = doc(db, "users", uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setCurrentUser({ ...docSnap.data(), uid });
          }
          setUser({ uid, displayName, email, photoURL });
          nookies.set(undefined, "token", token, { path: "/" });
        } else {
          setUser(null);
          nookies.set(undefined, "token", "", { path: "/" });
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
