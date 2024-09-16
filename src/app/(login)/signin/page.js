"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import LeftArrow from "@/assets/icons/LeftArrow";
import GooglePlayIconWhite from "@/assets/icons/GooglePlayIconWhite";
import AppleIconWhite from "@/assets/icons/AppleIconWhite";
import heroImage1 from "@/assets/images/heroImage1.jpg";
import SigninForm from "./SigninForm";
import ExternalProviderLoginButton from "@/components/ExternalProviderLoginButton";

export default function signinPage() {
  const router = useRouter();
  return (
    <div className="bg-light-grey min-h-screen flex flex-col justify-between lg:flex lg:flex-row">
      <div className="lg:w-1/2">
        <div className="border-b border-black lg:border-none">
          <div className="container mx-auto px-5 py-4 h-[65px] flex items-center relative lg:px-[52px] lg:pt-14 lg:pb-0 lg:h-[100px]">
            <button
              onClick={() => router.back()}
              className="justify-self-start"
              aria-label="Retour"
            >
              <LeftArrow className="w-[18px] lg:w-7" />
            </button>
            <Image
              src={HorsetedLogoBlackHorizontal}
              alt="Logo Horseted"
              className="absolute left-1/2 -translate-x-1/2 w-[148px] lg:w-52"
            />
          </div>
        </div>
        <div className="container mx-auto px-5 pt-5 pb-14 flex flex-col lg:max-w-[505px] lg:pb-10 lg:pt-[60px] xl:px-0">
          <div>
            <h1 className="text-center font-mcqueen font-bold text-[22px] leading-[48px] lg:text-[36px] lg:mb-3">
              Se connecter
            </h1>
            <ExternalProviderLoginButton providerName="google" type="signin" />
            {/* <ExternalProviderLoginButton providerName="apple" type="signin" /> */}
            <Suspense fallback={<div>Loading...</div>}>
              <SigninForm />
            </Suspense>
          </div>
          <h2 className="font-mcqueen font-bold text-[22px] leading-[32px] text-center lg:text-[28px] lg:leading-[48px]">
            Inscription
          </h2>
          <p className="text-center mb-3 lg:text-[18px]">
            Vous n’avez pas de compte ?
          </p>
          <Button
            href="/signup"
            variant="transparent-green"
            className="w-full text-xl h-[52px] lg:w-[335px] lg:self-center"
          >
            S’inscrire
          </Button>
        </div>
      </div>
      <div className="bg-light-green text-white flex flex-col items-center lg:w-1/2">
        <Image
          src={heroImage1}
          alt="Promenade à cheval dans un champ"
          className="hidden lg:block w-full h-[71vh] object-cover"
          priority
          sizes="(min-width: 1024px) 50vw, 0vw"
        />
        <h2 className="hidden lg:block font-mcqueen font-bold text-3xl leading-[32px] mt-14 mb-6 text-center">
          Articles d’équitation <br /> de seconde main
        </h2>
        <div className="flex justify-center gap-2">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-white px-[19px] py-[11px] rounded-xl my-8 lg:my-0 lg:pl-7 lg:mb-12"
            aria-label="Google Play"
          >
            <GooglePlayIconWhite className="w-8 h-8 mr-[14px]" />
            <div>
              <p className="text-[12px] leading-[14px] font-mcqueen lg:text-sm ">
                Télécharger sur
              </p>
              <p className="leading-[18px] font-mcqueen font-semibold lg:text-[20px]">
                Play Store
              </p>
            </div>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-white px-[19px] py-[11px] my-8 rounded-xl lg:my-0 lg:pl-7 lg:mb-12"
            aria-label="App Store"
          >
            <AppleIconWhite className="w-auto h-8 mr-[14px]" />
            <div>
              <p className="text-[12px] leading-[14px] font-mcqueen lg:text-sm ">
                Télécharger sur
              </p>
              <p className=" leading-[18px] font-mcqueen font-semibold lg:text-[20px]">
                App Store
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
