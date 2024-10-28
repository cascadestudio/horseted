import AddressModal from "@/components/Modal/AddresseModal";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import ModifyIcon from "@/assets/icons/ModifyIcon";

export default function Address({ activeAddress, setActiveAddress }) {
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
        <div className="border-b border-black pb-2">
          <h2 className="font-mcqueen font-bold text-xl mb-1">Adresse</h2>
          {activeAddress ? (
            <p>
              {`${activeAddress.fullName}, ${activeAddress.street},`} <br />
              {`${activeAddress.postalCode} ${activeAddress.city} `}
            </p>
          ) : (
            <p>Aucune adresse</p>
          )}
        </div>
        <button onClick={() => setIsModal(true)}>
          <ModifyIcon />
        </button>
      </div>
      {isModal && (
        <AddressModal
          setIsModal={setIsModal}
          setActiveAddress={setActiveAddress}
          isSaveAddressCheckbox
        />
      )}
    </>
  );
}
