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

    const { error, token } = await stripe.createToken(cardNumberElement);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      setIsAddPaymentCardModal(false);
      await postPaymentMethod(token.id, isDefaultCard);
      isNewPaymentMethod();
    }
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
        <CardNumberElement id="cardNumber" className="input" />
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="mb-5">
          <label htmlFor="cardExpiry" className="font-mcqueen font-semibold">
            Date exp :
          </label>
          <CardExpiryElement id="cardExpiry" className="input" />
        </div>
        <div className="mb-5">
          <label htmlFor="cardCvc" className="font-mcqueen font-semibold">
            CSV :
          </label>
          <CardCvcElement id="cardCvc" className="input" />
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

  async function postPaymentMethod(cardToken, isDefaultCard) {
    const query = `/users/me/payment_methods`;
    const body = {
      cardToken: cardToken,
      isDefault: isDefaultCard,
    };
    const response = await fetchHorseted(
      query,
      user.auth.accessToken,
      "POST",
      body
    );
    // console.log(response);
  }
};

export default AddPaymentCardModal;
