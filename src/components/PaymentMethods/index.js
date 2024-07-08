"use client";

import { useEffect, useState } from "react";
import AddPaymentCardModal from "./AddPaymentCardModal";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";

export default function PaymentMethods({
  activePaymentMethodId,
  setActivePaymentMethodId,
}) {
  const { user } = useAuthContext();
  const [isModal, setIsModal] = useState(true);
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
    <div>
      <h2 className="font-mcqueen font-bold text-xl mb-5">Mode de paiement</h2>
      {paymentMethods.map((paymentMethod) => {
        const { id, brand, last4 } = paymentMethod;
        return (
          <label
            key={id}
            className="flex items-center justify-between p-5 border border-light-green rounded-xl mb-5"
          >
            <input
              type="radio"
              value={id}
              checked={activePaymentMethodId === id}
              onChange={handlePaymentMethodChange}
            />
            {brand}
            {last4}
          </label>
        );
      })}
      <button
        onClick={() => setIsModal(true)}
        className="flex items-center justify-center p-2 bg-light-green rounded-full hover:bg-dark-green"
      >
        + Ajouter une carte bancaire
      </button>
      {isModal && (
        <AddPaymentCardModal
          isNewPaymentMethod={() => setIsNewPaymentMethod(true)}
        />
      )}
    </div>
  );
}

async function getPaymentMethods(user, setPaymentMethods) {
  const query = `/users/me/payment_methods`;
  const paymentMethods = await fetchHorseted(
    query,
    user.auth.accessToken,
    "GET"
  );
  setPaymentMethods(paymentMethods);
  // console.log("paymentMethods", paymentMethods);
}
