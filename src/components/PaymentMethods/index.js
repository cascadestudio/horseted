// Stripe test cards
// 4242 4242 4242 4242

"use client";

import { useEffect, useState } from "react";
import AddPaymentCardModal from "./AddPaymentCardModal";
import { useAuthContext } from "@/context/AuthContext";
import OptionBlock from "../input/OptionBlock";
import { deletePaymentMethods, getPaymentMethods } from "@/fetch/users";
import DeleteIcon from "@/assets/icons/DeleteIcon";

export default function PaymentMethods({
  activePaymentMethodId,
  setActivePaymentMethodId,
}) {
  const { user, accessToken } = useAuthContext();
  const [isAddPaymentCardModal, setIsAddPaymentCardModal] = useState(false);
  const [isNewPaymentMethod, setIsNewPaymentMethod] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      initActivePaymentMethodId();
    }
  }, [paymentMethods]);

  const fetchPaymentMethods = async () => {
    const methods = await getPaymentMethods(accessToken);
    setPaymentMethods(methods);
    setIsNewPaymentMethod(false);
  };

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

  const handleDeletePaymentMethods = async (paymentMethodId) => {
    await deletePaymentMethods(accessToken, paymentMethodId);
    if (setActivePaymentMethodId) {
      setActivePaymentMethodId(null);
    }
    await fetchPaymentMethods();
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
          <div key={id} className="flex">
            <OptionBlock
              defaultValue={id}
              checked={activePaymentMethodId === id}
              onChange={handlePaymentMethodChange}
              className="flex-grow max-w-[415px]"
            >
              <div className="flex gap-x-2">
                <img src={`/logos/${brand}.svg`} width="50" alt={brand} />
                <p>**** **** **** *{last4}</p>
              </div>
            </OptionBlock>
            <button
              className="shrink-1 mb-5 ml-5"
              onClick={() => handleDeletePaymentMethods(id)}
            >
              <DeleteIcon className="w-11 h-11 text-red" />
            </button>
          </div>
        );
      })}
      <button
        onClick={() => setIsAddPaymentCardModal(true)}
        className="flex items-center py-3 px-5 rounded-lg mb-5 bg-light-grey"
      >
        <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
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
          fetchPaymentMethods={fetchPaymentMethods}
        />
      )}
    </div>
  );
}
