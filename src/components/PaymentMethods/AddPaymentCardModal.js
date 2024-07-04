import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";

const AddPaymentCardModal = ({ isNewPaymentMethod }) => {
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

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      await postPaymentMethod(token.id, user);
      isNewPaymentMethod();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      4242 4242 4242 4242 12/34 123 77777
      {error && <div role="alert">{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
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
  console.log(response);
}
