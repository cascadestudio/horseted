"use client";
import signIn from "@/libs/firebase/auth/signin";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import HorsetedLogo from "@/assets/logos/HorsetedLogo.js";
import LeftArrow from "@/assets/icons/LeftArrow.svg";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";
import GooglePlayIconWhite from "@/assets/icons/GooglePlayIconWhite.svg";
import AppleIconWhite from "@/assets/icons/AppleIconWhite.svg";
import heroImage1 from "@/assets/images/heroImage1.jpg";

export default function signinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPasswordResetAlert, setShowPasswordResetAlert] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const passwordResetSent = searchParams.get("passwordResetSent");
    if (passwordResetSent === "true") {
      setShowPasswordResetAlert(true);
    }
  }, []);

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    return router.push("/");
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
        <div className="container mx-auto px-5 pt-5 pb-14 flex flex-col lg:max-w-[505px] lg:pb-10 lg:pt-[60px] xl:px-0">
          <div>
            <h1 className="text-center font-mcqueen font-bold text-[22px] leading-[48px] lg:text-[36px] lg:mb-3">
              Se connecter
            </h1>
            <a
              href="#"
              className="flex items-center border border-black w-fit rounded-[50px] p-1 ml-auto mr-auto lg:mb-[55px]"
            >
              <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
                <Image
                  src={GoogleIcon}
                  alt="Google Icon"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                />
              </div>
              <span className="font-semibold pl-3 pr-8 lg:pr-[70px] lg:pl-[38px]">
                Continuer avec Google
              </span>
            </a>
            <form
              onSubmit={handleForm}
              className="mt-3 border-b border-black mb-11 lg:border-t lg:pt-8 lg:border-b-0 lg:mb-[82px]"
            >
              <label htmlFor="email">
                <p className="mt-[18px] font-mcqueen font-semibold">Email :</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="exemple@mail.com"
                  className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-sm placeholder:text-grey pt-1 pb-2"
                />
              </label>
              <label htmlFor="password">
                <p className="mt-[18px] font-mcqueen font-semibold">
                  Mot de passe :
                </p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mot de passe"
                  className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-sm placeholder:text-grey pt-1 pb-2"
                />
              </label>
              <Button
                className="mt-[30px] w-full h-[52px] flex justify-center font-mcqueen font-semibold text-xl lg:mt-6"
                type="submit"
              >
                Se connecter
              </Button>
              <Link
                href="/forgot-password"
                className="font-mcqueen font-bold text-[13px] leading-[48px] mb-[30px] flex justify-center lg:text-[16px]"
              >
                Mot de passe oublié ?
              </Link>
              {showPasswordResetAlert && (
                <div className=" bg-[#EAF3E8] border border-light-green text-sm font-normal text-center h-16 rounded-[65px] flex items-center justify-center mb-8 p-6 lg:mb-0">
                  Un e-mail vous a été envoyé pour réinitialiser votre mot de
                  passe
                </div>
              )}
            </form>
          </div>
          <h2 className="font-mcqueen font-bold text-[22px] leading-[32px] text-center lg:text-[28px] lg:leading-[48px]">
            Inscription
          </h2>
          <p className="text-center mb-3 lg:text-[18px]">
            Vous n’avez pas de compte ?
          </p>
          <Button
            href="/signup"
            variant="transparent"
            className="w-full flex justify-center font-mcqueen font-semibold text-xl h-[52px] lg:w-[335px] lg:self-center"
          >
            S’inscrire
          </Button>
        </div>
      </div>
      <div className="bg-light-green text-white flex flex-col items-center lg:w-1/2">
        <Image
          src={heroImage1}
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
          >
            <Image
              src={AppleIconWhite}
              alt="Apple icon"
              className="w-auto h-8 mr-[14px]"
            />
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
