import { TextInput } from "@/components/input";
import Modal from "@/components/Modal";

export default function AddressModal({
  setIsModal,
  address,
  setStripeAccountForm,
  setIsAdressValid,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStripeAccountForm((prevState) => ({
      ...prevState,
      individual: {
        ...prevState.individual,
        address: {
          ...prevState.individual.address,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = () => {
    const isAdressValid = Object.values(address).every((value) => value !== "");

    if (!isAdressValid) {
      alert("Veuillez renseigner toutes les informations");
    } else {
      setIsAdressValid(true);
      setIsModal(false);
    }
  };

  return (
    <Modal
      isNotForm
      buttonText="Ajouter"
      title="Ajouter une adresse"
      onClose={() => setIsModal(false)}
      onSubmit={handleSubmit}
    >
      <TextInput
        label="N° et nom de rue"
        name="line1"
        maxLength={32}
        value={address.line1}
        onChange={handleChange}
        required
        placeholder="Ex : 1 avenue de la Paix"
      />
      <TextInput
        label="Code postal"
        name="postal_code"
        value={address.postal_code}
        onChange={handleChange}
        required
        minLength={5}
        maxLength={5}
        placeholder="Ex : 75 015"
      />
      <TextInput
        label="Ville"
        name="city"
        value={address.city}
        onChange={handleChange}
        required
      />
    </Modal>
  );
}
