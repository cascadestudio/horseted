"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import AddressModal from "@/components/Modal/AddresseModal";
import Checkbox from "@/components/input/Checkbox";
import AddAddressButton from "./AddAddressButton";
import AddressCard from "./AddressCard";
import { getAddresses } from "@/fetch/addresses";
import Alert from "@/components/Alert";

export default function Addresses() {
  const { accessToken } = useAuthContext();
  const [addresses, setAddresses] = useState([]);
  const [isDeliverySimilar, setIsDeliverySimilar] = useState(true);
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
  });

  useEffect(() => {
    handleGetAddresses();
  }, []);

  async function handleGetAddresses() {
    const adresses = await getAddresses(accessToken);
    setAddresses(adresses);
  }

  const deliveryAddresses = addresses
    .filter((address) => address.type === "delivery")
    .sort((a, b) => b.isDefault - a.isDefault);
  const shippingAddresses = addresses
    .filter((address) => address.type === "shipping")
    .sort((a, b) => b.isDefault - a.isDefault);

  const handleIsDeliverySimilar = async () => {
    setIsDeliverySimilar(!isDeliverySimilar);
  };

  return (
    <div className="grid grid-cols-1 lg:pt-14 lg:grid-cols-2 lg:gap-x-14 gap-y-4 lg:gap-y-2">
      <h3 className="text-[24px] font-mcqueen font-bold mb-2 lg:col-start-1">
        Adresse de livraison
      </h3>
      {deliveryAddresses.length > 0 &&
        deliveryAddresses.map((address) => {
          return (
            <div className="self-end" key={address.id}>
              <AddressCard
                address={address}
                getAddresses={getAddresses}
                accessToken={accessToken}
                handleGetAddresses={handleGetAddresses}
              />
            </div>
          );
        })}
      <AddAddressButton
        onClick={() => setModal({ isOpen: true, type: "delivery" })}
      />
      <h3 className="text-[24px] font-mcqueen font-bold lg:col-start-2 lg:row-start-1">
        Adresse de facturation
      </h3>
      <div className="flex gap-2 items-start lg:col-start-2 lg:row-start-2 flex-col">
        <label className="font-semibold leading-5 flex ">
          <Checkbox
            className="mr-2"
            value={isDeliverySimilar}
            checked={isDeliverySimilar}
            onChange={handleIsDeliverySimilar}
          />
          Identique à l’adresse de livraison
        </label>
      </div>
      {!isDeliverySimilar && (
        <div className="w-full lg:col-start-2 lg:row-start-3 lg:mt-[-40px]">
          {shippingAddresses.length > 0 &&
            shippingAddresses.map((address) => {
              return (
                <AddressCard
                  address={address}
                  key={address.id}
                  accessToken={accessToken}
                  handleGetAddresses={handleGetAddresses}
                />
              );
            })}
        </div>
      )}
      {!isDeliverySimilar && (
        <div className="lg:col-start-2">
          <AddAddressButton
            onClick={() => setModal({ isOpen: true, type: "shipping" })}
          />
        </div>
      )}
      {modal.isOpen && (
        <AddressModal
          isDeliverySimilar={isDeliverySimilar}
          type={modal.type}
          setIsModal={() => setModal((prev) => ({ ...prev, isOpen: false }))}
          handleGetAddresses={handleGetAddresses}
          setAlert={setAlert}
          isAddressSaved={true}
        />
      )}
      {alert && (
        <Alert setAlert={setAlert} type={alert.type} message={alert.message} />
      )}
    </div>
  );
}
