"use client";

import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useIsClickOutsideElement } from "@/utils/hooks";
import Link from "next/link";
import useHandleSignout from "@/hooks/useHandleSignout";
import MyAccountIcon from "@/assets/icons/MyAccountIcon";
import ChevronRight from "@/assets/icons/ChevronRight";
import ChevronDown from "@/assets/icons/ChevronDown";
import OrdersIcon from "@/assets/icons/OrdersIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";

export default function MyAccountDropDown({ className }) {
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
    <div className={className} ref={dropdownRef}>
      <Button
        onClick={handleClick}
        className="w-full lg:flex lg:items-center lg:gap-[10px] group hover:text-white"
        variant="white"
      >
        <p>Mon compte</p>
        <ChevronDown className="hidden lg:block lg:w-3 group-hover:stroke-white" />
      </Button>
      {isClickDropdown && !isClickOutside && (
        <div className="absolute top-[55px] bg-white border border-dark-green rounded-b-[20px] flex p-3 pb-2 z-10 w-[300px]">
          <ul className="w-full">
            <li>
              <Link
                href="/mon-compte"
                className="flex items-center justify-between p-5 border-b border-light-grey"
                onClick={handleClick}
              >
                <div className="flex items-center gap-4">
                  <MyAccountIcon className="w-[18px] h-[18px]" />
                  <p className="font-semibold">Mon compte</p>
                </div>
                <ChevronRight className="h-3" />
              </Link>
            </li>
            <li>
              <Link
                href="/commandes/achats"
                className="flex items-center justify-between p-5 border-b border-light-grey"
                onClick={handleClick}
              >
                <div className="flex items-center justify-center gap-[18px]">
                  <OrdersIcon className="w-3 h-5 ml-[3px]" />
                  <p className="font-semibold">Commandes</p>
                </div>
                <ChevronRight className="h-3" />
              </Link>
            </li>
            <li>
              <Link
                href="/parametres"
                className="flex items-center justify-between p-5 border-b border-light-grey"
                onClick={handleClick}
              >
                <div className="flex items-center gap-4">
                  <SettingsIcon className="w-[18px] h-[18px]" />
                  <p className="font-semibold">Paramètres</p>
                </div>
                <ChevronRight className="h-3" />
              </Link>
            </li>
            <button
              onClick={handleSignout}
              className="p-5 text-center font-semibold text-red w-full"
            >
              Se déconnecter
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}
