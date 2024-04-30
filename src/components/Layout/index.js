"use client";
import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();

  // const idToken = user.accessToken;
  console.log(user);

  useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  return (
    <AuthContextProvider>
      <Header />
      {children}
      <Footer />
    </AuthContextProvider>
  );
}
