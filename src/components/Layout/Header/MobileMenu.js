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
import MessageIcon from "@/components/MessageIcon";
import GooglePlayIcon from "@/assets/icons/GooglePlayIcon";
import AppleIcon from "@/assets/icons/AppleIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";

export default function MobileMenu({ categories }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="lg:hidden bg-white z-10 w-screen">
      <div
        className={`grid grid-cols-[30px,1fr,30px] w-full items-center px-5 pb-5 ${
          isNavOpen ? "border-b" : ""
        }`}
      >
        <button onClick={toggleNav}>
          {isNavOpen ? <CloseButton className="h-8 w-8" /> : <BurgerIcon />}
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
      {!isNavOpen && <SearchBar className="mx-5 mb-3" />}
      {isNavOpen && (
        <div>
          <div className="flex flex-col items-center mt-4 mb-9 pb-3 border-b">
            <div className="w-full mb-2 px-5">
              <Button onClick={() => setIsNavOpen(false)} href="/vendre">
                Vendre
              </Button>
            </div>
            <AccountHandler
              setIsNavOpen={setIsNavOpen}
              className="w-full px-5"
            />
            <h3 className="uppercase font-semibold text-sm text-center mt-5 mb-1 border-t w-full pt-5">
              Parcourir
            </h3>
            {categories.map((category) => {
              const { name, id } = category;
              return (
                <Link
                  href={`/articles?categoryId=${id}&categoryName=${name}`}
                  key={category.id}
                  className="w-full px-11 py-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  {capitalizeText(category.name)}
                </Link>
              );
            })}
            <h3 className="uppercase font-semibold text-sm text-center mt-3 mb-1 border-t w-full pt-5">
              Découvrir
            </h3>
            <Link
              className="w-full px-11 py-2"
              href="/aide"
              onClick={() => setIsNavOpen(false)}
            >
              Aide
            </Link>
            <Link
              className="w-full px-11 py-2"
              href="/a-propos"
              onClick={() => setIsNavOpen(false)}
            >
              À propos
            </Link>
            <Link
              className="w-full px-11 py-2"
              href="/actualites"
              onClick={() => setIsNavOpen(false)}
            >
              Actualités
            </Link>
          </div>
          <div className="px-11 mb-9">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-black bg-white px-9 py-3 rounded-xl mb-3"
              onClick={() => setIsNavOpen(false)}
            >
              <GooglePlayIcon className="w-8 h-8 mr-4" />
              <div>
                <p className="text-[16px] leading-6 font-mcqueen">
                  Télécharger sur
                </p>
                <p className="text-2xl leading-6 font-mcqueen font-semibold">
                  Play Store
                </p>
              </div>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-black bg-white px-9 py-3 rounded-xl"
              onClick={() => setIsNavOpen(false)}
            >
              <AppleIcon className="w-auto h-8 mr-4" />
              <div>
                <p className="text-[16px] leading-6 font-mcqueen">
                  Télécharger sur
                </p>
                <p className="text-2xl leading-6 font-mcqueen font-semibold">
                  App Store
                </p>
              </div>
            </a>
          </div>
          <div className="flex justify-center mb-9">
            <div className="inline-flex justify-center items-center gap-5 px-5 py-3 bg-light-grey border border-black rounded-full [&>a>svg]:h-6">
              <a href="#" onClick={() => setIsNavOpen(false)}>
                <InstagramIcon />
              </a>
              <a href="#" onClick={() => setIsNavOpen(false)}>
                <YoutubeIcon />
              </a>
              <a href="#" onClick={() => setIsNavOpen(false)}>
                <FacebookIcon />
              </a>
              <a href="#" onClick={() => setIsNavOpen(false)}>
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
