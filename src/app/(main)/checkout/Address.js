import AddressModal from "./AddressModal";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function Address({ setActiveAddress }) {
  const { accessToken } = useAuthContext();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAdress(accessToken, setAddresses);
  }, []);

  useEffect(() => {
    if (addresses?.length > 0) {
      setActiveAddress(addresses[1]);
    }
  }, [addresses]);

  return (
    <div>
      <h2 className="font-mcqueen font-bold text-xl mb-5">Addresse</h2>
      {addresses?.length > 0 ? (
        addresses.map((address) => {
          return <p key={address.id}>{address.fullName}</p>;
        })
      ) : (
        <p>Aucune adresse</p>
      )}
      <AddressModal />
    </div>
  );
}

async function getAdress(accessToken, setFormData) {
  const adresses = await fetchHorseted(`/users/me/addresses`, accessToken);
  setFormData(adresses);
}
