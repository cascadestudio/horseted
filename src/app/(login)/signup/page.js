"use client";
import signUp from "@/libs/firebase/auth/signup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import HorsetedLogo from "@/assets/logos/HorsetedLogo.js";
import LeftArrow from "@/assets/icons/LeftArrow.svg";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";
import GooglePlayIconWhite from "@/assets/icons/GooglePlayIconWhite.svg";
import AppleIconWhite from "@/assets/icons/AppleIconWhite.svg";
import tickIcon from "@/assets/icons/tickIcon.svg";
import HeroImage2 from "@/assets/images/HeroImage2.jpg";

export default function signupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

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
          <h1 className="text-center font-mcqueen font-bold text-[22px] lg:text-[36px]">
            Créer un compte
          </h1>
          <form
            onSubmit={handleForm}
            className=" border-b border-black mb-6 pb-6"
          >
            <label htmlFor="email">
              <p className="mt-4 font-mcqueen font-semibold">Email :</p>
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
                className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
              />
            </label>
            <label htmlFor="username">
              <p className="mt-[18px] font-mcqueen font-semibold">
                Nom d'utilisateur :
              </p>
              <div className="flex items-center border-b border-black">
                <span className="text-black font-mcqueen font-semibold mr-2 pb-1">
                  @
                </span>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  type="text"
                  name="username"
                  id="username"
                  placeholder="sophiemarceau"
                  className="bg-transparent w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2 pl-1"
                />
              </div>
            </label>
            <div className="mt-4">
              <label className="flex items-start mt-3">
                <div className="w-4 h-4 lg:w-5 lg:h-5 relative">
                  <input
                    type="checkbox"
                    size="10"
                    checked={newsletter}
                    onChange={() => setNewsletter(!newsletter)}
                    className="appearance-none cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-black rounded bg-white checked:bg-light-green checked:border-transparent"
                  />
                  {newsletter && (
                    <Image
                      src={tickIcon}
                      alt="Tick Icon"
                      width={10}
                      height={7}
                      className="absolute w-auto inset-0 mx-auto mt-[6px] cursor-pointer"
                    />
                  )}
                </div>
                <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
                  Je souhaite recevoir par e-mail des offres personnalisées et
                  les dernières mises à jour.
                </span>
              </label>
              <label className="flex items-start mt-3">
                <div className="w-4 h-4 lg:w-5 lg:h-5 relative">
                  <input
                    type="checkbox"
                    size="10"
                    required
                    className="appearance-none peer cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-black rounded bg-white checked:bg-light-green checked:border-transparent"
                  />
                  <Image
                    src={tickIcon}
                    alt="Tick Icon"
                    width={10}
                    height={7}
                    className="absolute w-auto inset-0 mx-auto mt-[6px] cursor-pointer peer-checked:visible invisible"
                  />
                </div>
                <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
                  J’accepte les{" "}
                  <a href="#" className="underline">
                    conditions d’utilisation
                  </a>
                  , j’ai lu la{" "}
                  <a href="#" className="underline">
                    politique de confidentialité
                  </a>{" "}
                  et j’ai + de 18 ans.
                </span>
              </label>
            </div>
            <Button
              className="mt-[30px] w-full h-[52px] flex justify-center font-mcqueen font-semibold text-xl lg:mt-6"
              type="submit"
            >
              Créer un compte
            </Button>
          </form>
          <a
            href="#"
            className="flex items-center border border-black w-fit rounded-[50px] p-1 ml-auto mr-auto mb-8"
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
          <h2 className="font-mcqueen font-bold text-[22px] leading-[32px] text-center lg:text-[28px] lg:leading-[48px]">
            Se connecter
          </h2>
          <p className="text-center mb-3 lg:text-[18px]">
            Vous avez déjà un compte ?
          </p>
          <Button
            href="/signin"
            variant="transparent"
            className="w-full flex justify-center font-mcqueen font-semibold text-xl h-[52px] lg:w-[335px] lg:self-center"
          >
            Se connecter
          </Button>
        </div>
      </div>
      <div className="bg-light-green text-white flex flex-col items-center lg:w-1/2">
        <Image
          src={HeroImage2}
          alt="Hero Image"
          className="hidden lg:block w-full h-[71vh] object-cover"
          priority
          sizes="50vw"
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
              <p className="leading-[18px] font-mcqueen font-semibold lg:text-[20px]">
                App Store
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
