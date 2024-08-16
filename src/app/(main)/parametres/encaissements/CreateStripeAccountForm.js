import { TextInput } from "@/components/input";

export default function CreateStripeAccount({ handleChange, stripeForm }) {
  return (
    <div className="col-span-2 lg:col-span-1">
      <h2 className="font-mcqueen text-[24px] font-bold">
        Informations vendeur
      </h2>
      <TextInput
        onChange={handleChange}
        label="Prénom"
        placeholder="Prénom"
        name="first_name"
        value={stripeForm.first_name}
        required
      />
      <TextInput
        onChange={handleChange}
        label="Prénom"
        placeholder="Prénom"
        name="last_name"
        value={stripeForm.last_name}
        required
      />
      <TextInput
        onChange={handleChange}
        label="Date de naissance"
        placeholder="Date de naissance"
        name="birthDate"
        value={stripeForm.dateOfBirth}
        required
      />
      <TextInput
        onChange={handleChange}
        label="IBAN"
        placeholder="FR********"
        name="IBAN"
        value={stripeForm.IBAN}
        required
      />
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
  );
}
