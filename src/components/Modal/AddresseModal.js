import { TextInput } from "@/components/input";
import { useState } from "react";
import Modal from "@/components/Modal";
import Checkbox from "@/components/input/Checkbox";
import { postAddress } from "@/fetch/addresses";
import { useAuthContext } from "@/context/AuthContext";

export default function AddressModal({
  setIsModal,
  type,
  isDeliverySimilar,
  handleGetAddresses,
  setActiveAddress,
  isSaveAddressCheckbox,
  isAddressSaved,
  setIsAddressSaved,
  setAlert,
}) {
  const { accessToken } = useAuthContext();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    postalCode: "",
    city: "",
    country: "FR",
    additionalInfos: "",
    type: type,
    isDefault: false,
  });

  const handleIsAddressSaved = (e) => {
    setIsAddressSaved(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: name === "isDefault" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let addressData = { ...address };
    if (!addressData.additionalInfos) {
      delete addressData.additionalInfos;
    }
    const response = await postAddress(accessToken, addressData);
    if (response === "address_not_valid") {
      setAlert({
        type: "error",
        message: "Adresse invalide",
      });
      return;
    }
    setAlert;
    if (setActiveAddress) {
      setActiveAddress(response);
    }
    if (isDeliverySimilar) {
      addressData.type = "shipping";
      await postAddress(accessToken, addressData);
    }

    setIsModal(false);
    if (handleGetAddresses) {
      await handleGetAddresses();
    }
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
      {isSaveAddressCheckbox && (
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
      )}
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
