import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuthContext } from "@/context/AuthContext";
import Modal from "@/components/Modal";
import Checkbox from "../input/Checkbox";
import { postPaymentMethod } from "@/fetch/payment";

const AddPaymentCardModal = ({
  setIsAddPaymentCardModal,
  fetchPaymentMethods,
}) => {
  const { accessToken } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDefaultCard, setIsDefaultCard] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, token } = await stripe.createToken(cardNumberElement);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      setIsAddPaymentCardModal(false);
      await postPaymentMethod(accessToken, token.id, isDefaultCard);
      fetchPaymentMethods();
    }
  };

  const stripeStyle = {
    base: {
      color: "black",
      backgroundColor: "transparent",
      fontWeight: "400",
      fontSize: "0.875rem",
      lineHeight: "1.375rem",
      "::placeholder": {
        color: "#ADA89F",
      },
      ":-webkit-autofill": {
        color: "#ADA89F",
      },
    },
    invalid: {
      color: "#EF4444",
    },
  };

  return (
    <Modal
      title="Ajouter un moyen de paiement"
      className="flex flex-col align-center "
      onSubmit={handleSubmit}
      buttonText="Ajouter"
      onClose={() => {
        setIsAddPaymentCardModal(false);
      }}
    >
      <div className="flex gap-x-2 m-auto mb-5">
        <img src={`/logos/visa.svg`} width="50" alt="visa" />
        <img src={`/logos/mastercard.svg`} width="40" alt="mastercard" />
      </div>
      <div className="mb-5 pb-1 border-b border-black">
        <label htmlFor="cardNumber" className="font-mcqueen font-semibold">
          Numéro de carte :
        </label>
        <CardNumberElement id="cardNumber" options={{ style: stripeStyle }} />
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="mb-5 pb-1 border-b border-black">
          <label htmlFor="cardExpiry" className="font-mcqueen font-semibold">
            Date exp :
          </label>
          <CardExpiryElement id="cardExpiry" options={{ style: stripeStyle }} />
        </div>
        <div className="mb-5 pb-1 border-b border-black">
          <label htmlFor="cardCvc" className="font-mcqueen font-semibold">
            CSV :
          </label>
          <CardCvcElement id="cardCvc" options={{ style: stripeStyle }} />
        </div>
      </div>
      {error && <div role="alert">{error}</div>}
      <label className="font-semibold cursor-pointer flex mb-5">
        <Checkbox
          checked={isDefaultCard === true}
          onChange={() => setIsDefaultCard(!isDefaultCard)}
          className="mr-2"
        />
        Définir par défaut*
      </label>
      <p className="text-xs font-semibold mb-5 text-grey">
        *Payer plus rapidement la prochaine fois en enregistrant la carte par
        défaut. Vous pouvez modifier ce paramètre à tout moment dans "Paramètres{" "}
        {">"} Paiements".
      </p>
    </Modal>
  );
};

export default AddPaymentCardModal;
