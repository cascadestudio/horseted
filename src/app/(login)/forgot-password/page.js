"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import LeftArrow from "@/assets/icons/LeftArrow";
import GooglePlayIconWhite from "@/assets/icons/GooglePlayIconWhite";
import AppleIconWhite from "@/assets/icons/AppleIconWhite";
import heroImage3 from "@/assets/images/heroImage3.jpg";
import fetchHorseted from "@/utils/fetchHorseted";
import { TextInput } from "@/components/input";
import NewPasswordModal from "./NewPasswordModal";
import Alert from "@/components/Alert";

export default function forgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [showPasswordResetAlert, setShowPasswordResetAlert] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();

    await fetchHorseted(
      `/forgotten_password`,
      null,
      "POST",
      { email: email },
      true
    );

    setShowPasswordResetAlert(true);
  };

  return (
    <>
      <div className="bg-light-grey min-h-screen flex flex-col justify-between lg:flex lg:flex-row">
        <div className="pb-16 lg:pb-0 lg:w-1/2">
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
          <div className="container mx-auto px-5 pt-5 pb-14 flex flex-col justify-between h-[calc(100vh_-_var(--header-height)-120px)] lg:max-w-[505px] lg:pb-4 lg:pt-[60px] lg:h-[calc(100vh_-_var(--header-height))] xl:px-0">
            <h1 className="text-center font-mcqueen font-bold text-[22px] leading-[48px] lg:text-[36px] lg:mb-3">
              Mot de passe oublié
            </h1>
            <form onSubmit={handleForm} className="lg:pt-8">
              <TextInput
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="exemple@mail.com"
                className="mb-[18px] lg:mb-0"
              />
              <Button
                className="mt-1 w-full h-[52px] flex justify-center font-mcqueen font-semibold text-xl lg:mt-6"
                type="submit"
              >
                Régénérer le mot de passe
              </Button>
              {showPasswordResetAlert && (
                <div className="mt-6 bg-[#EAF3E8] border border-light-green text-sm font-normal text-center h-16 rounded-[65px] flex items-center justify-center mb-8 p-6 lg:mb-0">
                  Un e-mail vous a été envoyé pour réinitialiser votre mot de
                  passe
                </div>
              )}
            </form>
            <div className="flex flex-col my-5">
              <h2 className="font-mcqueen font-bold text-[22px] leading-[32px] text-center lg:text-[28px] lg:leading-[48px]">
                Se connecter
              </h2>
              <p className="text-center mb-3 lg:text-[18px]">
                Vous avez déjà un compte ?
              </p>
              <Button
                href="/signup"
                variant="transparent-green"
                className="w-full flex justify-center font-mcqueen font-semibold text-xl h-[52px] lg:w-[335px] lg:self-center"
              >
                Se connecter
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-light-green mt-10 lg:mt-0 text-white flex flex-col items-center lg:w-1/2">
          <Image
            src={heroImage3}
            alt="Promenade à cheval dans les dunes"
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
              aria-label="Apple Store"
            >
              <AppleIconWhite className="w-auto h-8 mr-[14px]" />
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
      <NewPasswordModal setAlert={setAlert} />
      {alert && (
        <Alert type={alert?.type} setAlert={setAlert}>
          {alert?.message}
        </Alert>
      )}
    </>
  );
}
