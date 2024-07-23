"use client";

import { useEffect, useState } from "react";
import AddPaymentCardModal from "./AddPaymentCardModal";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import OptionBlock from "../input/OptionBlock";

export default function PaymentMethods({
  activePaymentMethodId,
  setActivePaymentMethodId,
}) {
  const { user } = useAuthContext();
  const [isAddPaymentCardModal, setIsAddPaymentCardModal] = useState(false);
  const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    getPaymentMethods(user, setPaymentMethods);
  }, []);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      initActivePaymentMethodId();
    }
  }, [paymentMethods]);

  useEffect(() => {
    if (isNewPaymentMethod) {
      getPaymentMethods(user, setPaymentMethods);
      setIsNewPaymentMethod(false);
    }
  }, [isNewPaymentMethod]);

  const handlePaymentMethodChange = (e) => {
    const paymentMethodId = e.target.value;
    const newActivePaymentMethod = paymentMethods.find(
      (paymentMethod) => paymentMethod.id === paymentMethodId
    );
    setActivePaymentMethodId(newActivePaymentMethod.id);
  };

  const initActivePaymentMethodId = () => {
    const defautlPaymentMethod = paymentMethods.find(
      (paymentMethod) => paymentMethod.isDefault
    );
    if (defautlPaymentMethod) {
      setActivePaymentMethodId(defautlPaymentMethod.id);
    } else {
      setActivePaymentMethodId(paymentMethods[0].id);
    }
  };

  return (
    <div className="pt-4 lg:pt-14">
      <h2 className="font-mcqueen font-bold text-[24px] mb-4">
        Mode de paiement
      </h2>
      <h3 className="font-mcqueen font-semibold text-lg mb-4">
        Carte bancaire
      </h3>
      {paymentMethods.map((paymentMethod) => {
        const { id, brand, last4 } = paymentMethod;
        return (
          <OptionBlock
            key={id}
            defaultValue={id}
            checked={activePaymentMethodId === id}
            onChange={handlePaymentMethodChange}
          >
            <div className="flex gap-x-2">
              <img src={`/logos/${brand}.svg`} width="50" alt={brand} />
              <p>**** **** **** *{last4}</p>
            </div>
          </OptionBlock>
        );
      })}
      <button
        onClick={() => setIsAddPaymentCardModal(true)}
        className="flex items-center py-3 px-5 border border-darker-grey rounded-lg mb-5 bg-light-grey w-full"
      >
        <span className="mr-5 w-10 h-10 flex items-center justify-center bg-lighter-green border border-light-green rounded-full text-4xl text-light-green">
          +
        </span>
        Ajouter une carte bancaire
      </button>
      <p className="font-semibold text-xs text-grey">
        Les informations de paiements sont confidentielles et ne seront jamais
        transmises au cavalier.
      </p>
      {isAddPaymentCardModal && (
        <AddPaymentCardModal
          setIsAddPaymentCardModal={setIsAddPaymentCardModal}
          isNewPaymentMethod={() => setIsNewPaymentMethod(true)}
        />
      )}
    </div>
  );

  async function getPaymentMethods() {
    const query = `/users/me/payment_methods`;
    const paymentMethods = await fetchHorseted(
      query,
      user.auth.accessToken,
      "GET"
    );
    setPaymentMethods(paymentMethods);
    // console.log("paymentMethods", paymentMethods);
  }
}
