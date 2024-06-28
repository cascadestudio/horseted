import ClientStripeProvider from "@/components/ClientStripeProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Ajouter une carte bancaire</h2>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Nom complet :</label>
        <input
          type="text"
          placeholder="Ex : Sophie Marceau"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Numéro de carte :</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded"
      >
        Enregistrer
      </button>
    </form>
  );
};

const WrappedPaymentForm = () => (
  <ClientStripeProvider>
    <PaymentForm />
  </ClientStripeProvider>
);

export default WrappedPaymentForm;
