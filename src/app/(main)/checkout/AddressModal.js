import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Modal from "@/components/Modal";
import Checkbox from "@/components/input/Checkbox";

export default function AddressModal({ setIsModal }) {
  const { user, accessToken } = useAuthContext();
  const [formData, setFormData] = useState({});
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  useEffect(() => {
    // TODO: post and patch address when UI is ready
    // console.log("formData", formData);
  }, [formData]);

  const handleIsAddressSaved = (event) => {
    setIsAddressSaved(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal title="Ajouter une adresse" onClose={() => setIsModal(false)}>
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
        required
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
          value={formData.isDefault}
          checked={formData.isDefault}
          onChange={handleChange}
        />
        <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
          Définir par défaut
        </span>
      </label>

      {/* TODO: isDefault toggle button */}
    </Modal>
  );
}
