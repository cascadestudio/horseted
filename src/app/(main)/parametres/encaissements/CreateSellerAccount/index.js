"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";
import CreateStripeAccountForm from "./CreateStripeAccountForm";
import HandleFilesForm from "./HandleFilesForm";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CreateSellerAccount({
  accessToken,
  user,
  getSellerData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [isAdressValid, setIsAdressValid] = useState(false);
  const [stripeAccountForm, setStripeAccountForm] = useState({
    tos_shown_and_accepted: true,
    business_type: "individual",
    individual: {
      first_name: "",
      last_name: "",
      email: user?.auth.email,
      address: {
        line1: "",
        city: "",
        postal_code: "",
      },
      dob: {
        day: null,
        month: null,
        year: null,
      },
      verification: {
        document: {
          back: null,
          front: null,
        },
      },
    },
  });
  const [stripeBankAccountForm, setStripeBankAccountForm] = useState({
    country: "FR",
    currency: "eur",
    account_number: null, //Test IBAN FR1420041010050500013M02606
  });

  console.log("stripeAccountForm =>", stripeAccountForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsLoading(true);
    const accountToken = await createStripeAccount();
    console.log("accountToken =>", accountToken);
    const bankAccountToken = await createStripeBankAccount();
    console.log("bankAccountToken =>", bankAccountToken);
    await createSellerAccount(accountToken, bankAccountToken);
    getSellerData();
    setIsLoading(false);
  };

  const isFormValid = () => {
    const isDocumentValid =
      stripeAccountForm.individual.verification.document.front !== null &&
      stripeAccountForm.individual.verification.document.back !== null;
    if (!isAdressValid) {
      alert("Veuillez ajouter une adresse");
      return false;
    } else if (!isDocumentValid) {
      alert("Veuiller sélectionner un document d'identité");
      return false;
    } else {
      return true;
    }
  };

  const addDateOfBirth = () => {
    const date = new Date(dateOfBirth);
    return {
      ...stripeAccountForm,
      individual: {
        ...stripeAccountForm.individual,
        dob: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      },
    };
  };

  const createStripeAccount = async (filesIds) => {
    const stripeAccountFormWithDate = addDateOfBirth();
    try {
      const stripe = await stripePromise;
      const accountToken = await stripe.createToken(
        "account",
        stripeAccountFormWithDate
      );
      const token = accountToken.token.id;
      return token;
    } catch (error) {
      alert("Error creating Stripe account:", error);
      console.log("Error creating Stripe account:", error);
    }
  };

  const createStripeBankAccount = async () => {
    try {
      const stripe = await stripePromise;
      const bankAccountToken = await stripe.createToken(
        "bank_account",
        stripeBankAccountForm
      );
      const token = bankAccountToken.token.id;
      return token;
    } catch (error) {
      alert("Error creating Stripe bank account:", error);
    }
  };

  const createSellerAccount = async (accountToken, bankAccountToken) => {
    const body = {
      accountToken: accountToken,
      bankAccountToken: bankAccountToken,
    };
    const response = await fetchHorseted(
      "/users/me/seller_account",
      accessToken,
      "POST",
      body,
      true,
      true
    );
    console.log("createSellerAccount =>", response);
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:pt-5 lg:grid-cols-2 lg:gap-x-14 gap-y-4"
    >
      <p className="text-xs font-semibold col-span-2">
        Pour vendre des produits sur Horseted, vous devez valider votre identité
        avec le formulaire ci-dessous.
      </p>
      <CreateStripeAccountForm
        setStripeAccountForm={setStripeAccountForm}
        stripeAccountForm={stripeAccountForm}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        stripeBankAccountForm={stripeBankAccountForm}
        setStripeBankAccountForm={setStripeBankAccountForm}
        isAdressValid={isAdressValid}
        setIsAdressValid={setIsAdressValid}
      />
      <HandleFilesForm
        setStripeAccountForm={setStripeAccountForm}
        accessToken={accessToken}
      />
      <Button type="submit" className="w-full">
        Envoyer
      </Button>
    </form>
  );
}
