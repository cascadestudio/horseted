import UploadIcon from "@/assets/icons/UploadIcon";
import Button from "@/components/Button";
import { TextInput } from "@/components/input";
import Checkbox from "@/components/input/Checkbox";

export default function Transactions() {
  return (
    <div className="grid grid-cols-1 lg:pt-5 lg:grid-cols-2 lg:gap-x-14 gap-y-4">
      <p className="text-xs font-semibold col-span-2">
        Pour vendre des produits sur Horseted, vous devez valider votre identité
        avec le formulaire ci-dessous
      </p>
      <div className="col-span-2 lg:col-span-1">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Informations vendeur
        </h2>
        <TextInput label="Prénom" placeholder="Prénom" />
        <TextInput label="Nom" placeholder="Nom" />
        <TextInput label="Date de naissance" placeholder="Date de naissance" />
        <TextInput label="IBAN" placeholder="FR********" />
        <h3 className="font-mcqueen font-semibold mt-6">
          Adresse d’expédition :
        </h3>
        <button className="flex items-center py-3 px-5 pl-0 mb-5 bg-light-grey w-full">
          <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
            +
          </span>
          Ajouter une adresse
        </button>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Vérification de l’identité
        </h2>
        <h3 className="font-mcqueen font-semibold mb-2">
          Document d’identité :
        </h3>
        <button className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4">
          <UploadIcon />
          <p className="text-sm font-semibold uppercase text-center">
            Passeport
          </p>
        </button>
        <p className="text-center uppercase text-xl">ou</p>
        <p className="text-center uppercase text-light-green mb-2">
          Carte d'identité
        </p>
        <div className="flex gap-8">
          <button className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4">
            <UploadIcon />
            <p className="text-sm font-semibold uppercase text-center">Recto</p>
          </button>
          <button className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4">
            <UploadIcon />
            <p className="text-sm font-semibold uppercase text-center">Verso</p>
          </button>
        </div>
        <label className="flex items-start mt-12 mb-7">
          <Checkbox />
          <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
            J’accepte que mon identité soit vérifiée par Horseted
          </span>
        </label>
        <Button className="w-full">Envoyer</Button>
      </div>
    </div>
  );
}
