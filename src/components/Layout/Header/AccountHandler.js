"use client";

import { useAuthContext } from "@/context/AuthContext";
import MyAccountDropDown from "./MyAccountDropDown";
import Link from "next/link";
import HeartIcon from "@/assets/icons/HeartIcon";
import MessageIcon from "@/components/MessageIcon";
import Button from "@/components/Button";

export default function AccountHandler({
  setNavIsOpen,
  className,
  isInMobileMenu = false,
}) {
  const { user } = useAuthContext();

  return (
    <div className={className}>
      {user === null ? (
        <Button
          variant={isInMobileMenu ? "" : "transparent-green"}
          href="/signin"
        >
          Se connecter / S’inscrire
        </Button>
      ) : (
        <>
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <MyAccountDropDown />
            <Button noStyle withAuth href="/favoris">
              <HeartIcon />
            </Button>
            <span className="bg-black h-5 w-px"></span>
            <Link href="/messagerie">
              <MessageIcon />
            </Link>
          </div>
          <div className="w-full lg:hidden">
            <MyAccountDropDown setNavIsOpen={setNavIsOpen} className="w-full" />
            <div className="flex items-center justify-center mt-5 gap-4">
              <Button
                noStyle
                withAuth
                href="/favoris"
                onClick={() => setNavIsOpen(false)}
              >
                <HeartIcon />
              </Button>
              <span className="bg-black h-5 w-px"></span>
              <Link href="/messagerie" onClick={() => setNavIsOpen(false)}>
                <MessageIcon />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
