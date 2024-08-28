"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";
import AccountHandler from "./AccountHandler";
import BurgerIcon from "./BurgerIcon";
import capitalizeText from "@/utils/capitalizeText";
import CloseButton from "@/assets/icons/CloseButton";
import MessageIcon from "@/assets/icons/MessageIcon";

export default function MobileMenu({ categories }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="lg:hidden bg-white z-10 w-screen">
      <div className="grid grid-cols-[30px,1fr,30px] w-full border-b items-center px-5">
        <button onClick={toggleNav}>
          {isNavOpen ? <CloseButton /> : <BurgerIcon />}
        </button>
        <Link href="/">
          <Image
            src={HorsetedLogoBlackHorizontal}
            alt="Horseted Logo"
            priority
            className="w-[210px] h-[45px] mx-auto"
          />
        </Link>
        {!isNavOpen && (
          <Link href="/messagerie">
            <MessageIcon />
          </Link>
        )}
      </div>
      {!isNavOpen && <SearchBar />}
      {isNavOpen && (
        <div className="flex flex-col items-center mt-4 px-5">
          <Button className="w-full mb-2" href="/vendre">
            Vendre
          </Button>
          <AccountHandler className="w-full mb-5" />
          <h3 className="uppercase font-semibold text-sm text-center mt-5 border-t w-full pt-5">
            Parcourir
          </h3>
          {categories.map((category) => {
            const { name, id } = category;
            return (
              <Link
                href={`/articles?categoryId=${id}&categoryName=${name}`}
                key={category.id}
                className="w-full px-3 py-2"
              >
                {capitalizeText(category.name)}
              </Link>
            );
          })}
          <h3 className="uppercase font-semibold text-sm text-center mt-5 border-t w-full pt-5">
            Découvrir
          </h3>
          <Link className="w-full px-3 py-2" href="/aide">
            Aide
          </Link>
          <Link className="w-full px-3 py-2" href="/a-propos">
            À propos
          </Link>
          <Link className="w-full px-3 py-2" href="/actualites">
            Actualités
          </Link>
        </div>
      )}
    </div>
  );
}
