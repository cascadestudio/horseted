"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";
import AccountHandler from "./AccountHandler";
import BurgerIcon from "./BurgerIcon";
import NavBar from "./NavBar";
import CloseButton from "@/assets/icons/CloseButton";

export default function MobileMenu({ categories }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="lg:hidden z-10 bg-white flex">
      <button onClick={toggleNav} aria-label="Toggle navigation">
        {isNavOpen ? <CloseButton /> : <BurgerIcon />}
      </button>

      {isNavOpen && (
        <div className="flex flex-col items-center space-y-4 mt-4">
          <Link href="/" className="mb-4">
            <Image
              src={HorsetedLogoBlackHorizontal}
              alt="Horseted Logo"
              priority
              className="w-[210px] h-[45px]"
            />
          </Link>
          <NavBar
            categories={categories}
            className="flex flex-col items-center space-y-4"
          />
          <SearchBar />
          <Button href="/vendre">Vendre</Button>
          <AccountHandler />
        </div>
      )}
    </div>
  );
}
