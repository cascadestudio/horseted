import Modal from "@/components/Modal";
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
      title="Suppression de compte"
      onClose={() => {
        setIsReAuthModal(false);
      }}
      className="lg:px-1"
    >
      <p className="text-center font-medium mb-10">
        Vous êtes sur le point de supprimer définitivement votre compte. Cette
        action est irréversible et supprimera définitivement toutes vos données.
      </p>
      <a
        href="#"
        className="flex items-center border border-black w-fit rounded-[50px] p-1 ml-auto mr-auto"
      >
        <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
          <img src="/icons/google-logo.svg" alt="Logo Google" />
        </div>
        <span className="font-semibold pl-3 pr-8 lg:pr-[70px] lg:pl-[38px] text-nowrap">
          Continuer avec Google
        </span>
      </a>

      <form
        onSubmit={handleForm}
        className={`mt-4 border-b border-black mb-11 lg:border-b-0 lg:mb-[82px]`}
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
        <div className="flex items-center justify-between mt-8">
          <Button className="grow" type="button" variant="red">
            Annuler
          </Button>
          <button className="text-red font-semibold px-6" type="submit">
            Je souhaite supprimer mon compte
          </button>
        </div>
      </form>
    </Modal>
  );
}
