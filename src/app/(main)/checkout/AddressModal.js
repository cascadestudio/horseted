import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Modal from "@/components/Modal";
import Checkbox from "@/components/input/Checkbox";

export default function AddressModal({ setIsModal, setActiveAddress }) {
  const { accessToken } = useAuthContext();
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    postalCode: "",
    city: "",
    country: "FR",
    additionalInfos: "1er étage",
    type: "delivery",
    isDefault: false,
  });

  // console.log("formData =>", formData);

  const handleIsAddressSaved = (event) => {
    setIsAddressSaved(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isDefault" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postAddress();
    setIsModal(false);
  };

  async function postAddress() {
    const query = `/users/me/addresses`;
    const address = await fetchHorseted(
      query,
      accessToken,
      "POST",
      formData,
      true
    );
    setActiveAddress(address);
  }

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
        value={formData.fullName}
        onChange={handleChange}
        required
        placeholder="Sophie Marceau"
      />
      <TextInput
        label="Pays"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
        disabled
      />
      <TextInput
        label="N° et nom de rue"
        name="street"
        value={formData.street}
        onChange={handleChange}
        required
        placeholder="Ex : 1 avenue de la Paix"
      />
      <TextInput
        label="Complément d’adresse"
        name="additionalInfos"
        value={formData.additionalInfos}
        onChange={handleChange}
        placeholder="Ex : Bâtiment C"
      />
      <TextInput
        label="Code postal"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        required
        placeholder="Ex : 75 015"
      />
      <TextInput
        label="Ville"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <label className="flex items-start mt-3">
        <Checkbox
          name="isAddressSaved"
          value={isAddressSaved}
          checked={isAddressSaved}
          onChange={handleIsAddressSaved}
        />
        <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
          Enregistrer l’adresse pour plus tard
        </span>
      </label>
      <label className="flex items-start mt-3">
        <Checkbox
          name="isDefault"
          value={formData.isDefault}
          checked={formData.isDefault}
          onChange={handleChange}
          disabled={!isAddressSaved}
        />
        <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
          Définir par défaut
        </span>
      </label>
    </Modal>
  );
}
