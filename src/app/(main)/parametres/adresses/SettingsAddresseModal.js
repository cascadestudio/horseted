import { TextInput } from "@/components/input";
import { useState } from "react";
import Modal from "@/components/Modal";
import Checkbox from "@/components/input/Checkbox";

export default function AddressModal({
  setIsModal,
  getAddresses,
  type,
  isDeliverySimilar,
  postAddress,
}) {
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    postalCode: "",
    city: "",
    country: "FR",
    additionalInfos: "1er étage",
    type: type,
    isDefault: false,
  });

  // console.log("address =>", address);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: name === "isDefault" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModal(false);
    let newAddress = address;
    await postAddress(newAddress);
    if (isDeliverySimilar) {
      newAddress.type = "shipping";
      await postAddress(newAddress);
    }
    getAddresses();
  };

  return (
    <Modal
      onSubmit={handleSubmit}
      buttonText="Ajouter"
      title="Ajouter une adresse"
      onClose={() => setIsModal(false)}
    >
      <TextInput
        label="Nom complet"
        name="fullName"
        value={address.fullName}
        onChange={handleChange}
        required
        placeholder="Sophie Marceau"
      />
      <TextInput
        label="Pays"
        name="country"
        value={address.country}
        onChange={handleChange}
        required
        disabled
      />
      <TextInput
        label="N° et nom de rue"
        name="street"
        value={address.street}
        onChange={handleChange}
        required
        placeholder="Ex : 1 avenue de la Paix"
      />
      <TextInput
        label="Complément d’adresse"
        name="additionalInfos"
        value={address.additionalInfos}
        onChange={handleChange}
        placeholder="Ex : Bâtiment C"
      />
      <TextInput
        label="Code postal"
        name="postalCode"
        value={address.postalCode}
        onChange={handleChange}
        required
        placeholder="Ex : 75 015"
      />
      <TextInput
        label="Ville"
        name="city"
        value={address.city}
        onChange={handleChange}
        required
      />
      <label className="flex items-start mt-3">
        <Checkbox
          name="isDefault"
          value={address.isDefault}
          checked={address.isDefault}
          onChange={handleChange}
        />
        <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
          Définir par défaut
        </span>
      </label>
    </Modal>
  );
}
