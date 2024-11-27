import Modal from "@/components/Modal";
import signIn from "@/libs/firebase/auth/signin";
import Button from "@/components/Button";
import { deleteFirebaseUser } from "@/libs/firebase/auth/deleteUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { TextInput } from "@/components/input";

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
      <form
        onSubmit={handleForm}
        className={`mt-4 border-b border-black mb-11 lg:border-b-0 lg:mb-[82px]`}
      >
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
        <TextInput
          label="Mot de passe"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Mot de passe"
        />
        <div className="flex flex-col gap-5 lg:flex-row items-center justify-between mt-8">
          <Button className="grow w-full lg:w-auto" type="button" variant="red">
            Annuler
          </Button>
          <button
            className="text-red font-semibold w-full mb-3 lg:mb-0 lg:px-6"
            type="submit"
          >
            Je souhaite supprimer mon compte
          </button>
        </div>
      </form>
    </Modal>
  );
}
