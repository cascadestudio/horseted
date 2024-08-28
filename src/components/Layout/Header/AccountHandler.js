"use client";
import { useAuthContext } from "@/context/AuthContext";
import MyAccountDropDown from "./MyAccountDropDown";
import Link from "next/link";
import HeartIcon from "@/assets/icons/HeartIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import Button from "@/components/Button";

export default function AccountHandler({ className }) {
  const { user } = useAuthContext();

  return (
    <div className={className}>
      {user === null ? (
        <Link href="/signin">Se connecter / S’inscrire</Link>
      ) : (
        <div className="flex items-center gap-4">
          <MyAccountDropDown />
          <Button noStyle withAuth href="/favoris">
            <HeartIcon />
          </Button>
          <span className="bg-black h-5 w-px"></span>
          <Link href="/messagerie">
            <MessageIcon />
          </Link>
        </div>
      )}
    </div>
  );
}
