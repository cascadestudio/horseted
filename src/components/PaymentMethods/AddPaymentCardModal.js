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
import Checkbox from "../input/Checkbox";

const AddPaymentCardModal = ({
  isNewPaymentMethod,
  setIsAddPaymentCardModal,
}) => {
  const { user } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    // style: {
    //   base: {
    //     color: "#32325d",
    //     fontFamily: "Arial, sans-serif",
    //     fontSmoothing: "antialiased",
    //     fontSize: "16px",
    //     "::placeholder": {
    //       color: "#aab7c4",
    //     },
    //   },
    //   invalid: {
    //     color: "#fa755a",
    //     iconColor: "#fa755a",
    //   },
    // },
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
      <div className="mb-5">
        <label htmlFor="cardNumber" className="font-mcqueen font-semibold">
          Numéro de carte :
        </label>
        <CardNumberElement
          id="cardNumber"
          options={elementOptions}
          className="input"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="mb-5">
          <label htmlFor="cardExpiry" className="font-mcqueen font-semibold">
            Date exp :
          </label>
          <CardExpiryElement
            id="cardExpiry"
            options={elementOptions}
            className="input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="cardCvc" className="font-mcqueen font-semibold">
            CSV :
          </label>
          <CardCvcElement
            id="cardCvc"
            options={elementOptions}
            className="input"
          />
        </div>
      </div>
      {error && <div role="alert">{error}</div>}
      <label className="font-semibold cursor-pointer flex mx-auto mb-5">
        <Checkbox
          checked={isDefaultCard === true}
          onChange={() => setIsDefaultCard(!isDefaultCard)}
          className="mr-2"
        />
        Enregistrer carte par défaut*
      </label>
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
