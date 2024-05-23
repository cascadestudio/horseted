"use client";
import signIn from "@/libs/firebase/auth/signin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import HorsetedLogo from "@/assets/logos/HorsetedLogo.js";
import LeftArrow from "@/assets/icons/LeftArrow.svg";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";

export default function signinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
    <div className="bg-light-grey min-h-screen">
      <div className="border-b border-black">
        <div className="container mx-auto px-5 py-4 flex items-center relative">
          <Link href="/" className="justify-self-start">
            <Image src={LeftArrow} alt="Prec" className="h-[14px]" />
          </Link>
          <HorsetedLogo className="absolute left-1/2 -translate-x-1/2 w-[148px]" />
        </div>
      </div>
      <div className="container mx-auto px-5 pt-5 pb-14 flex flex-col">
        <div>
          <h1 className="text-center font-mcqueen font-bold text-[22px] leading-[48px]">
            Se connecter
          </h1>
          <a
            href="#"
            className="flex items-center border border-black rounded-[50px] p-1 w-[267px] ml-auto mr-auto"
          >
            <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3">
              <Image src={GoogleIcon} alt="Google Icon" className="h-5 w-5" />
            </div>
            <span className="font-semibold pl-3 pr-8">Connect with Google</span>
          </a>
          <form onSubmit={handleForm} className="mt-3">
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
            <Button
              className="mt-8 w-full flex justify-center font-mcqueen font-semibold text-xl"
              type="submit"
            >
              Se connecter
            </Button>
          </form>
        </div>
        <p>Vous n’avez pas de compte ?</p>
        <Link href="/signup">S’inscrire</Link>
      </div>
    </div>
  );
}
