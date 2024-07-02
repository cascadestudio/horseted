import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import signIn from "@/libs/firebase/auth/signin";
import Button from "@/components/Button";
import Link from "next/link";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPasswordResetAlert, setShowPasswordResetAlert] = useState(false);

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

    return router.push("/");
  };

  return (
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
        />
      </label>
      <label htmlFor="password">
        <p className="mt-[18px] font-mcqueen font-semibold">Mot de passe :</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
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
          Un e-mail vous a été envoyé pour réinitialiser votre mot de passe
        </div>
      )}
    </form>
  );
}
