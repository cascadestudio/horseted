"use client";
import { useAuthContext } from "@/context/AuthContext";
import MyAccountDropDown from "./MyAccountDropDown";
import Link from "next/link";
import HeartIcon from "@/assets/icons/HeartIcon";
import MessageIcon from "@/assets/icons/MessageIcon";

export default function AccountHandler() {
  const { user } = useAuthContext();

  return (
    <>
      {user === null ? (
        <Link href="/signin">Se connecter / S’inscrire</Link>
      ) : (
        <>
          <MyAccountDropDown />
          <HeartIcon className="hidden lg:block" />
          <span className="bg-black h-5 w-px hidden lg:block"></span>
          <Link href="/messagerie">
            <MessageIcon />
          </Link>
        </>
      )}
    </>
  );
}
