"use client";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/libs/firebase/config";
import { createContext, useContext, useState, useEffect } from "react";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [me, setMe] = useState({});

  const [loading, setLoading] = useState(true);

  async function fetchUser(accessToken) {
    await fetch(`http://localhost:3000/api/getUser?accessToken=${accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setMe(data.data);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUser(user.accessToken);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, me }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
