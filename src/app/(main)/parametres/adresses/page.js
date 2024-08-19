// const addresses = [
//   {
//     id: 1,
//     createdAt: new Date(),
//     fullName: "John Doe",
//     street: "18 avenue de la Paix",
//     postalCode: "34000 ",
//     city: "Montpellier",
//     country: "US",
//     additionalInfos: "",
//     type: "delivery",
//     latitude: 37.7749,
//     longitude: -122.4194,
//     isDefault: true,
//   },
// ];

"use client";

import DeleteIcon from "@/assets/icons/DeleteIcon";
import ModifyIcon from "@/assets/icons/ModifyIcon";
import Radio from "@/components/input/Radio";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import AddressModal from "./SettingsAddresseModal";

export default function Addresses() {
  const { accessToken } = useAuthContext();
  const [addresses, setAddresses] = useState([]);
  const [isModal, setIsModal] = useState(false);

  console.log("addresses =>", addresses);

  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
    const adresses = await fetchHorseted(`/users/me/addresses`, accessToken);
    setAddresses(adresses);
  }

  async function deleteAddress(addressId) {
    const query = `/users/me/addresses/${addressId}`;
    await fetchHorseted(query, accessToken, "DELETE");
    getAddresses();
  }

  return (
    <div className="grid grid-cols-1 lg:pt-14 lg:grid-cols-2 lg:gap-x-14 gap-y-4 lg:gap-y-2">
      <h3 className="text-[24px] font-mcqueen font-bold mb-2 lg:col-start-1">
        Adresse de livraison
      </h3>
      {addresses.length > 0 &&
        addresses.map((address) => {
          const { id, street, postalCode, city, additionalInfos } = address;
          return (
            <div
              className="bg-white rounded-xl p-5 border border-lighter-grey lg:col-start-1 flex justify-between items-center"
              key={id}
            >
              <div className="text-sm">
                <p>{street}</p>
                <p>
                  {postalCode} {city}
                </p>
                <p>{additionalInfos}</p>
              </div>
              <div className="flex gap-2">
                <button>
                  <ModifyIcon className="w-9 h-9" />
                </button>
                <button onClick={() => deleteAddress(id)}>
                  <DeleteIcon className="w-9 h-9 text-red" />
                </button>
              </div>
            </div>
          );
        })}
      <button
        onClick={() => setIsModal(true)}
        className="flex items-center px-5 mt-4 bg-light-grey w-full col-start-1"
      >
        <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
          +
        </span>
        <span className="text-lg font-medium">Ajouter une adresse</span>
      </button>
      <h3 className="text-[24px] font-mcqueen font-bold lg:col-start-2 lg:row-start-1">
        Adresse de facturation
      </h3>
      <div className="flex gap-2 items-start lg:col-start-2 lg:row-start-2">
        <Radio />
        <p className="font-semibold leading-5">
          Identique à l’adresse de livraison
        </p>
      </div>
      {isModal && (
        <AddressModal setIsModal={setIsModal} getAddresses={getAddresses} />
      )}
    </div>
  );
}
