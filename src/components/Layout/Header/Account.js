"use client";
import { useAuthContext } from "@/context/AuthContext";
import MyAccountDropDown from "./MyAccountDropDown";
import Link from "next/link";

export default function Account() {
  const { user } = useAuthContext();

  // console.log("user =>", user);

  return (
    <>
      {user === null ? (
        <Link href="/signin">Se connecter / S’inscrire</Link>
      ) : (
        <MyAccountDropDown />
      )}
    </>
  );
}
