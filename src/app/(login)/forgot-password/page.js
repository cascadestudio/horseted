"use client";
import sendPasswordResetEmail from "@/libs/firebase/auth/sendPasswordResetEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import HorsetedLogo from "@/assets/logos/HorsetedLogo.js";
import LeftArrow from "@/assets/icons/LeftArrow.svg";
import GooglePlayIconWhite from "@/assets/icons/GooglePlayIconWhite.svg";
import AppleIconWhite from "@/assets/icons/AppleIconWhite.svg";
import HeroImage3 from "@/assets/images/HeroImage3.jpg";

export default function forgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await sendPasswordResetEmail(email);

    if (error) {
      return console.log(error);
    }

    // else successful
    return router.push(`/signin?passwordResetSent=true`);
  };

  return (
    <div className="bg-light-grey min-h-screen flex flex-col justify-between lg:flex lg:flex-row">
      <div className="lg:w-1/2">
        <div className="border-b border-black lg:border-none">
          <div className="container mx-auto px-5 py-4 h-[65px] flex items-center relative lg:px-[52px] lg:pt-14 lg:pb-0 lg:h-[100px]">
            <Link href="/" className="justify-self-start">
              <Image src={LeftArrow} alt="Prec" className="w-[18px] lg:w-7" />
            </Link>
            <HorsetedLogo className="absolute left-1/2 -translate-x-1/2 w-[148px] lg:w-52" />
          </div>
        </div>
        <div className="container mx-auto px-5 pt-5 pb-14 flex flex-col justify-between h-[calc(100vh_-_var(--header-height)-120px)] lg:max-w-[505px] lg:pb-4 lg:pt-[60px] lg:h-[calc(100vh_-_var(--header-height))] xl:px-0">
          <h1 className="text-center font-mcqueen font-bold text-[22px] leading-[48px] lg:text-[36px] lg:mb-3">
            Mot de passe oublié
          </h1>
          <form onSubmit={handleForm} className="lg:pt-8">
            <label htmlFor="email">
              <p className="mt-[18px] font-mcqueen font-semibold">Email :</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="exemple@mail.com"
                className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
              />
            </label>
            <Button
              className="mt-[30px] w-full h-[52px] flex justify-center font-mcqueen font-semibold text-xl lg:mt-6"
              type="submit"
            >
              Régénérer le mot de passe
            </Button>
          </form>
          <div className="flex flex-col">
            <h2 className="font-mcqueen font-bold text-[22px] leading-[32px] text-center lg:text-[28px] lg:leading-[48px]">
              Se connecter
            </h2>
            <p className="text-center mb-3 lg:text-[18px]">
              Vous avez déjà un compte ?
            </p>
            <Button
              href="/signup"
              variant="transparent"
              className="w-full flex justify-center font-mcqueen font-semibold text-xl h-[52px] lg:w-[335px] lg:self-center"
            >
              Se connecter
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-light-green text-white flex flex-col items-center lg:w-1/2">
        <Image
          src={HeroImage3}
          alt="Hero Image"
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
          >
            <Image
              src={GooglePlayIconWhite}
              alt="Google Play icon"
              className="w-8 h-8 mr-[14px]"
            />
            <div>
              <p className="text-[12px] leading-[14px] font-mcqueen lg:text-[14px] lg:leading-[16px]">
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
          >
            <Image
              src={AppleIconWhite}
              alt="Apple icon"
              className="w-8 h-8 mr-[14px]"
            />
            <div>
              <p className="text-[12px] leading-[14px] font-mcqueen lg:text-[14px] lg:leading-[16px]">
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
