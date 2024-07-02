"use client";

import { getAuth, signOut } from "firebase/auth";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useIsClickOutsideElement } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyAccountDropDown() {
  const dropdownRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(dropdownRef);
  const [isClickDropdown, setIsClickDropdown] = useState(false);
  const router = useRouter();

  function handleClick() {
    if (isClickOutside) {
      setIsClickDropdown(true);
    } else {
      setIsClickDropdown(!isClickDropdown);
    }
    setIsClickOutside(false);
  }

  function handleSignout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div ref={dropdownRef}>
      <Button
        onClick={() => handleClick()}
        className="hidden lg:block"
        variant="white"
      >
        Mon compte
      </Button>
      {isClickDropdown && !isClickOutside && (
        <div className="absolute top-[51px] bg-white border border-dark-green rounded-b-[20px] flex p-5 z-10">
          <ul>
            <li>
              <Link href="/account">Mon compte</Link>
            </li>
            <li>
              <Link href="/orders">Commandes</Link>
            </li>
            <li>
              <Link href="/parametres">Paramètres</Link>
            </li>
            <button onClick={() => handleSignout()}>Se déconnecter</button>
          </ul>
        </div>
      )}
    </div>
  );
}
