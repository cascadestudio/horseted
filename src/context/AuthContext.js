"use client";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/libs/firebase/config";
import { createContext, useContext, useState, useEffect } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { useRouter } from "next/navigation";

const auth = getAuth(firebase_app);
export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log("user =>", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const accessToken = firebaseUser.accessToken;
          const apiUser = await fetchHorseted(`/users/me`, accessToken);
          setUser({ auth: firebaseUser, ...apiUser });
          setAccessToken(firebaseUser.accessToken);
        } catch (error) {
          setLoading(false);
          console.error(error);
          // return router.push("/signin");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
