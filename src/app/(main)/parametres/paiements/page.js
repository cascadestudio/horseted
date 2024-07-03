"use client";
import { useEffect, useState } from "react";
import AddPaymentCardModal from "./AddPaymentCardModal";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";

export default function PaymentSettings() {
  const { user } = useAuthContext();
  const [isModal, setIsModal] = useState(true);
  const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    getPaymentMethods(user, setPaymentMethods);
  }, []);

  useEffect(() => {
    if (isNewPaymentMethod) {
      getPaymentMethods(user, setPaymentMethods);
      setIsNewPaymentMethod(false);
    }
  }, [isNewPaymentMethod]);

  return (
    <div>
      <h2 className="font-mcqueen font-bold text-xl mb-5">Mode de paiement</h2>
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className="flex items-center justify-between p-5 border border-light-green rounded-xl mb-5"
        >
          {method.brand}
          {method.last4}
        </div>
      ))}
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
}
