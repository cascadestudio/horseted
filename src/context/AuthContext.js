"use client";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/libs/firebase/config";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "@/libs/fetch";

const auth = getAuth(firebase_app);
export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  async function fetchUser(accessToken) {
    try {
      const query = `/users/me`;
      const data = await fetchData(query, accessToken);
      return data;
    } catch (error) {
      console.error(`Error fetching ${query}`, error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUser(user.accessToken).then((data) =>
          setUser({ ...user, ...data })
        );
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
