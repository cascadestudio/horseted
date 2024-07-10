import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import Modal from "@/components/Modal";

const AddPaymentCardModal = ({
  isNewPaymentMethod,
  setIsAddPaymentCardModal,
}) => {
  const { user } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { error, token } = await stripe.createToken(cardNumberElement);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      await postPaymentMethod(token.id, user);
      isNewPaymentMethod();
    }
  };

  const elementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
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
      <div className="flex gap-x-2 m-auto">
        <img src={`/logos/visa.svg`} width="50" alt="visa" />
        <img src={`/logos/mastercard.svg`} width="40" alt="mastercard" />
      </div>

      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <CardNumberElement
          id="cardNumber"
          options={elementOptions}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="cardExpiry"
          className="block text-sm font-medium text-gray-700"
        >
          Expiry Date
        </label>
        <CardExpiryElement
          id="cardExpiry"
          options={elementOptions}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="cardCvc"
          className="block text-sm font-medium text-gray-700"
        >
          CVC
        </label>
        <CardCvcElement
          id="cardCvc"
          options={elementOptions}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* <CardElement options={cardElementOptions} /> */}
      {error && <div role="alert">{error}</div>}
      {/* <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Ajouter la carte"}
      </button> */}
    </Modal>
  );
};

export default AddPaymentCardModal;

async function postPaymentMethod(cardToken, user) {
  const query = `/users/me/payment_methods`;
  const body = {
    cardToken: cardToken,
  };
  const response = await fetchHorseted(
    query,
    user.auth.accessToken,
    "POST",
    body
  );
  // console.log(response);
}
