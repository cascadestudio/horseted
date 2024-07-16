"use client";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/libs/firebase/config";
import { createContext, useContext, useState, useEffect } from "react";
import fetchHorseted from "@/utils/fetchHorseted";

const auth = getAuth(firebase_app);
export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log("user =>", user);

  async function fetchUser(accessToken) {
    try {
      const query = `/users/me`;
      const data = await fetchHorseted(query, accessToken);
      return data;
    } catch (error) {
      console.error(`Error fetching user`, error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const apiUser = await fetchUser(firebaseUser.accessToken);
          setUser({ auth: firebaseUser, ...apiUser });
          setAccessToken(firebaseUser.accessToken);
        } catch (error) {
          console.error("Failed to fetch additional user data:", error);
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
