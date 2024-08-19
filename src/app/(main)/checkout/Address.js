import AddressModal from "@/components/Modal/AddressModal";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function Address({
  activeAddress,
  setActiveAddress,
  setIsAddressSaved,
  isAddressSaved,
}) {
  const { accessToken } = useAuthContext();
  const [addresses, setAddresses] = useState([]);
  const [isModal, setIsModal] = useState(false);

  // console.log("addresses =>", addresses);

  useEffect(() => {
    getAdress();
  }, []);

  useEffect(() => {
    if (addresses?.length > 0) {
      setActiveAddress(addresses[1]);
    }
  }, [addresses]);

  async function getAdress() {
    const adresses = await fetchHorseted(`/users/me/addresses`, accessToken);
    setAddresses(adresses);
  }

  return (
    <>
      <div className="g-block flex justify-between">
        <h2 className="font-mcqueen font-bold text-xl mb-5">Addresse</h2>
        {activeAddress ? (
          <p>{`${activeAddress.fullName}, ${activeAddress.street}, ${activeAddress.postalCode}, ${activeAddress.city} `}</p>
        ) : (
          <p>Aucune adresse</p>
        )}
        <button onClick={() => setIsModal(true)}>Ajouter une adresse</button>
      </div>
      {isModal && (
        <AddressModal
          setIsModal={setIsModal}
          setActiveAddress={setActiveAddress}
          setIsAddressSaved={setIsAddressSaved}
          isAddressSaved={isAddressSaved}
        />
      )}
    </>
  );
}
