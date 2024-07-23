"use client";
import { useAuthContext } from "@/context/AuthContext";
import MyAccountDropDown from "./MyAccountDropDown";
import Link from "next/link";
import HeartIcon from "@/assets/icons/HeartIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import Button from "@/components/Button";

export default function AccountHandler() {
  const { user } = useAuthContext();

  return (
    <>
      {user === null ? (
        <Link href="/signin">Se connecter / S’inscrire</Link>
      ) : (
        <>
          <MyAccountDropDown />
          <Button noStyle withAuth href="/favoris">
            <HeartIcon className="hidden lg:block" />
          </Button>
          <span className="bg-black h-5 w-px hidden lg:block"></span>
          <Link href="/messagerie">
            <MessageIcon />
          </Link>
        </>
      )}
    </>
  );
}
