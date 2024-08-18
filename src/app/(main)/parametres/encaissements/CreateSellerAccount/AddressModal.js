import { TextInput } from "@/components/input";
import Modal from "@/components/Modal";

export default function AddressModal({
  setIsModal,
  stripeAccountForm,
  setStripeAccountForm,
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

  return (
    <Modal
      isNotForm
      buttonText="Ajouter"
      title="Ajouter une adresse"
      onClose={() => setIsModal(false)}
    >
      <TextInput
        label="N° et nom de rue"
        name="line1"
        value={stripeAccountForm.individual.address.line1}
        onChange={handleChange}
        required
        placeholder="Ex : 1 avenue de la Paix"
      />
      <TextInput
        label="Code postal"
        name="postal_code"
        value={stripeAccountForm.individual.address.postal_code}
        onChange={handleChange}
        required
        placeholder="Ex : 75 015"
      />
      <TextInput
        label="Ville"
        name="city"
        value={stripeAccountForm.individual.address.city}
        onChange={handleChange}
        required
      />
    </Modal>
  );
}
