"use client";

import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useIsClickOutsideElement } from "@/utils/hooks";
import Link from "next/link";
import useHandleSignout from "@/hooks/useHandleSignout";

export default function MyAccountDropDown() {
  const handleSignout = useHandleSignout();
  const dropdownRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(dropdownRef);
  const [isClickDropdown, setIsClickDropdown] = useState(false);

  function handleClick() {
    if (isClickOutside) {
      setIsClickDropdown(true);
    } else {
      setIsClickDropdown(!isClickDropdown);
    }
    setIsClickOutside(false);
  }

  return (
    <div ref={dropdownRef}>
      <Button onClick={handleClick} className="hidden lg:block" variant="white">
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
            <button onClick={handleSignout}>Se déconnecter</button>
          </ul>
        </div>
      )}
    </div>
  );
}
