"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();

  // console.log("user =>", user);

  useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
