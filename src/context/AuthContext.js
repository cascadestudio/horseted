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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const apiUser = await fetchHorseted(`/users/me`, token);
          setUser({ auth: firebaseUser, ...apiUser });
          setAccessToken(token);
        } catch (error) {
          console.error("Error fetching user data: ", error);
          // router.push("/signin");
        }
      } else {
        setUser(null);
        setAccessToken(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
