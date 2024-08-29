import Modal from "@/components/Modal";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";
import Image from "next/image";
import signIn from "@/libs/firebase/auth/signin";
import Button from "@/components/Button";
import { deleteFirebaseUser } from "@/libs/firebase/auth/deleteUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";

export default function ReAuthModal({ setIsReAuthModal, accessToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log(error);
    }
    await deleteFirebaseUser();
    await fetchHorseted(`/users/me`, accessToken, "DELETE", null, false, true);
    router.push("/");
  };

  return (
    <Modal
      isNotForm
      title="Confirmer mes identifiants"
      onClose={() => {
        setIsReAuthModal(false);
      }}
    >
      <a
        href="#"
        className="flex items-center border border-black w-fit rounded-[50px] p-1 ml-auto mr-auto"
      >
        <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
          <Image
            src={GoogleIcon}
            alt="Google Icon"
            className="h-5 w-5 lg:h-6 lg:w-6"
            priority
          />
        </div>
        <span className="font-semibold pl-3 pr-8 lg:pr-[70px] lg:pl-[38px] text-nowrap">
          Continuer avec Google
        </span>
      </a>
      <form
        onSubmit={handleForm}
        className={`mt-3 border-b border-black mb-11 lg:pt-8 lg:border-b-0 lg:mb-[82px]`}
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
          className="mt-[30px] w-full h-[52px] text-xl lg:mt-6"
          type="submit"
          variant="red"
        >
          Supprimer
        </Button>
      </form>
    </Modal>
  );
}
