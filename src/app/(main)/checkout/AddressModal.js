import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function AddressModal() {
  const { user, accessToken } = useAuthContext();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getAdress(accessToken, setFormData);
  }, []);

  useEffect(() => {
    // TODO: patch adress
    console.log("formData", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Ajouter une adresse</h1>
      <form className="form-container">
        <TextInput
          label="Nom de l'adresse"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <TextInput
          label="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <TextInput
          label="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <TextInput
          label="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <TextInput
          label="additionalInfos"
          name="additionalInfos"
          value={formData.additionalInfos}
          onChange={handleChange}
          required
        />
        <TextInput
          label="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        {/* TODO: isDefault toggle button */}
      </form>
    </div>
  );
}

async function getAdress(accessToken, setFormData) {
  const adresses = await fetchHorseted(`/users/me/addresses`, accessToken);
  setFormData(adresses[0]);
}
