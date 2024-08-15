import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { TextInput } from "@/components/input";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CreateStripeAccount() {
  const [loading, setLoading] = useState(false);
  const [accountToken, setAccountToken] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    IBAN: "",
  });

  const handleChange = () => {};

  useEffect(() => {
    if (accountToken) {
      console.log("Account Token:", accountToken);
    }
  }, [accountToken]);

  const handleCreateAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      const accountData = {
        business_type: "individual", // The type of account (either individual or company)
        individual: {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          //   ssn_last_4: "1234", // Only required for US individuals
          //   address: {
          //     line1: "123 Main Street",
          //     city: "San Francisco",
          //     state: "CA",
          //     postal_code: "94111",
          //     country: "US",
          //   },
          dob: {
            day: 1,
            month: 1,
            year: 1990,
          },
        },
      };

      if (accountData) {
        const accountToken = await stripe.createToken("account", accountData);
        setAccountToken(accountToken);
      } else {
        throw new Error(accountData.error || "Failed to create account token");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-2 lg:col-span-1">
      <h2 className="font-mcqueen text-[24px] font-bold">
        Informations vendeur
      </h2>
      <TextInput
        onChange={handleChange}
        label="Prénom"
        placeholder="Prénom"
        name="firstName"
        value={formData.firstName}
        required
      />
      <TextInput
        onChange={handleChange}
        label="Prénom"
        placeholder="Prénom"
        name="lastName"
        value={formData.lastName}
        required
      />
      <TextInput
        onChange={handleChange}
        label="Date de naissance"
        placeholder="Date de naissance"
        name="birthDate"
        value={formData.dateOfBirth}
        required
      />
      <TextInput
        onChange={handleChange}
        label="IBAN"
        placeholder="FR********"
        name="IBAN"
        value={formData.IBAN}
        required
      />
      <h3 className="font-mcqueen font-semibold mt-6">
        Adresse d’expédition :
      </h3>
      <button className="flex items-center py-3 px-5 pl-0 mb-5 bg-light-grey w-full">
        <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
          +
        </span>
        Ajouter une adresse
      </button>
      <h1>Create Stripe Account Token</h1>
      <button onClick={handleCreateAccount} disabled={loading}>
        {loading ? "Creating..." : "Create Account Token"}
      </button>

      {accountToken && (
        <div>
          <h2>Account Token:</h2>
          <p>{accountToken.token.id}</p>
        </div>
      )}

      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
