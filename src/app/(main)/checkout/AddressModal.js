import { TextInput } from "@/components/input";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Modal from "@/components/Modal";
import Checkbox from "@/components/input/Checkbox";
import { postAddress } from "@/fetch/addresses";

export default function AddressModal({
  setIsModal,
  setActiveAddress,
  isAddressSaved,
  setIsAddressSaved,
}) {
  const { accessToken } = useAuthContext();
  const [formData, setFormData] = useState({
    fullName: "",
    houseNumber: "",
    street: "",
    postalCode: "",
    city: "",
    country: "FR",
    additionalInfos: "",
    type: "delivery",
    isDefault: false,
  });

  const handleIsAddressSaved = (e) => {
    setIsAddressSaved(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isDefault" ? checked : value,
    }));
  };

  useEffect(() => {
    if (formData.isDefault) {
      setIsAddressSaved(true);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressData = { ...formData };
    if (!addressData.additionalInfos) {
      delete addressData.additionalInfos;
    }
    const address = await postAddress(accessToken, addressData);
    setActiveAddress(address);
    setIsModal(false);
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
        value={formData.fullName}
        onChange={handleChange}
        required
        placeholder="Sophie Marceau"
      />      
      <p className="label font-mcqueen font-semibold">Adresse :</p>
      <div className="flex flex-row">
        <TextInput
          className="w-[49px]"
          hideLabel={true}
          name="houseNumber"
          value={address.houseNumber}
          onChange={handleChange}
          required
          placeholder="No"
        />        
        <TextInput    
          className="pl-5"              
          hideLabel={true}
          name="street"
          value={address.street}
          onChange={handleChange}
          required
          placeholder="Adresse"
        />        
      </div>
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
        minLength={5}
        maxLength={5}
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
        />
        <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
          Définir par défaut
        </span>
      </label>
    </Modal>
  );
}
