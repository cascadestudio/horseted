"use client";
import { useState } from "react";
import AddPaymentCardModal from "./AddPaymentCardModal";

export default function PaymentSettings() {
  const [isModal, setIsModal] = useState(false);
  return (
    <div>
      <h2 className="font-mcqueen font-bold text-xl mb-5">Mode de paiement</h2>
      <button
        onClick={() => setIsModal(true)}
        className="flex items-center justify-center p-2 bg-light-green rounded-full hover:bg-dark-green"
      >
        + Ajouter une carte bancaire
      </button>
      {isModal && <AddPaymentCardModal />}
    </div>
  );
}
