"use client";

import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebase_app from "@/libs/firebase/config";
import { createContext, useContext, useState, useEffect } from "react";
import fetchHorseted from "@/utils/fetchHorseted";

const auth = getAuth(firebase_app);
export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const apiUser = await fetchHorseted(
            `/users/me`,
            token,
            "GET",
            null,
            false,
            false,
            true
          );
          setUser({ auth: firebaseUser, ...apiUser });
          setAccessToken(token);
        } catch (error) {
          console.error("Error fetching API user data: ", error);
          await signOut(auth);
          setUser(null);
          setAccessToken(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setAccessToken(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
