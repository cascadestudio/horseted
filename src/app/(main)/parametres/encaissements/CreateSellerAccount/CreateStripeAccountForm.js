import Modal from "@/components/Modal";
import { TextInput } from "@/components/input";
import AddressModal from "./AddressModal";
import { useState } from "react";

export default function CreateStripeAccount({
  stripeAccountForm,
  setStripeAccountForm,
  dateOfBirth,
  setDateOfBirth,
  stripeBankAccountForm,
  setStripeBankAccountForm,
}) {
  const [isModal, setIsModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStripeAccountForm({
      ...stripeAccountForm,
      individual: {
        ...stripeAccountForm.individual,
        [name]: value,
      },
    });
  };

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
        value={stripeAccountForm.individual.first_name}
        required
      />
      <TextInput
        onChange={handleChange}
        label="Nom"
        placeholder="Nom"
        name="last_name"
        value={stripeAccountForm.individual.last_name}
        required
      />
      <TextInput
        type="date"
        onChange={(e) => setDateOfBirth(e.target.value)}
        label="Date de naissance"
        placeholder="Date de naissance"
        name="dateOfBirth"
        value={dateOfBirth}
        required
      />
      <TextInput
        onChange={(e) =>
          setStripeBankAccountForm({
            ...stripeBankAccountForm,
            account_number: e.target.value,
          })
        }
        label="IBAN"
        placeholder="FR********"
        name="IBAN"
        value={stripeBankAccountForm.account_number}
        required
      />
      <h3 className="font-mcqueen font-semibold mt-6">
        Adresse d’expédition :
      </h3>
      <button
        type="button"
        onClick={() => setIsModal(true)}
        className="flex items-center py-3 px-5 pl-0 mb-5 bg-light-grey w-full"
      >
        <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
          +
        </span>
        Ajouter une adresse
      </button>
      {stripeAccountForm.individual.address && (
        <div>
          {stripeAccountForm.individual.address.line1}
          <br />
          {stripeAccountForm.individual.address.postal_code}
          {stripeAccountForm.individual.address.city}
        </div>
      )}
      {isModal && (
        <AddressModal
          stripeAccountForm={stripeAccountForm}
          setStripeAccountForm={setStripeAccountForm}
          setIsModal={setIsModal}
        />
      )}
    </div>
  );
}
