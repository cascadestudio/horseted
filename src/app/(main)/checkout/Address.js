import AddressModal from "./AddressModal";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function Address({
  activeAddress,
  setActiveAddress,
  notSavedAddress,
}) {
  const { accessToken } = useAuthContext();
  const [addresses, setAddresses] = useState([]);
  const [isModal, setIsModal] = useState(false);
  // const {fullName, street, postalCode, city} = activeAddress

  // console.log("addresses =>", addresses);

  useEffect(() => {
    getAdress(accessToken, setAddresses);
  }, []);

  useEffect(() => {
    if (addresses?.length > 0) {
      setActiveAddress(addresses[1]);
    }
  }, [addresses]);

  return (
    <>
      <div className="g-block flex justify-between">
        <h2 className="font-mcqueen font-bold text-xl mb-5">Addresse</h2>
        {activeAddress ? (
          <p>{`${activeAddress.fullName}, ${activeAddress.street}, ${activeAddress.postalCode}, ${activeAddress.city} `}</p>
        ) : (
          <p>Aucune adresse</p>
        )}

        {/* {addresses?.length > 0 ? (
          addresses.map((address) => {
            return <p key={address.id}>{address.fullName}</p>;
          })
        ) : (
          <p>Aucune adresse</p>
        )} */}
        <button onClick={() => setIsModal(true)}>Ajouter une adresse</button>
      </div>
      {isModal && (
        <AddressModal
          setIsModal={setIsModal}
          setActiveAddress={setActiveAddress}
        />
      )}
    </>
  );
}

async function getAdress(accessToken, setFormData) {
  const adresses = await fetchHorseted(`/users/me/addresses`, accessToken);
  setFormData(adresses);
}
