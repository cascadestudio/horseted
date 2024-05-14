"use client";

import { getAuth, signOut } from "firebase/auth";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useIsClickOutsideElement } from "@/libs/hooks";

export default function MyAccountDropDown() {
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

  function handleSignout() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
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
        <div className="absolute top-[51px] bg-white border border-dark-green rounded-b-[20px] flex">
          <button onClick={() => handleSignout()}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}
