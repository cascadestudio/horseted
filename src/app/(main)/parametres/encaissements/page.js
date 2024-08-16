"use client";

import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import CreateStripeAccountForm from "./CreateStripeAccountForm";
import HandleFilesForm from "./HandleFilesForm";
import Button from "@/components/Button";
import { objectToFormData } from "@/utils/objectToFormData";
import Spinner from "@/components/Spinner";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Transactions() {
  const { user, accessToken } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accountToken, setAccountToken] = useState(null);
  const [stripeForm, setStripeForm] = useState({
    IBAN: "",
    business_type: "individual",
    individual: {
      first_name: "",
      last_name: "",
      email: user?.auth.email,
      dob: {
        day: null,
        month: null,
        year: null,
      },
    },
  });
  const [files, setFiles] = useState({
    frontDocument: null,
    backDocument: null,
    frontAdditionalDocument: null,
    backAdditionalDocument: null,
  });

  console.log("stripeForm =>", stripeForm);
  console.log("accountToken =>", accountToken);
  console.log("error =>", error);

  useEffect(() => {
    // getSellerData();
  }, []);

  const getSellerData = async () => {
    const response = await fetchHorseted(
      "/users/me/seller_account",
      accessToken
    );
    console.log("response =>", response);
  };

  const handleStripeFormChange = (e) => {
    const { name, value } = e.target;
    setStripeForm({ ...stripeForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checkFormValidity();
    setIsLoading(true);
    await createStripeAccount();
    // await postFiles();
    setIsLoading(false);
  };

  const checkFormValidity = () => {
    const fileInput = document.querySelector('input[name="frontDocument"]');
    if (!fileInput.files.length) {
      alert("Please select a file.");
      return;
    }
  };

  const createStripeAccount = async () => {
    setError(null);

    try {
      const stripe = await stripePromise;

      const accountData = {
        business_type: "individual",
        individual: {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          dob: {
            day: 1,
            month: 1,
            year: 1990,
          },
        },
      };

      if (stripeForm) {
        const accountToken = await stripe.createToken("account", stripeForm);
        setAccountToken(accountToken);
      } else {
        throw new Error(accountData.error || "Failed to create account token");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const postFiles = async () => {
    const formData = objectToFormData(files);
    const response = await fetchHorseted(
      "/users/me/files",
      accessToken,
      "POST",
      formData,
      false,
      true
    );
    console.log("response =>", response);
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
        handleChange={handleStripeFormChange}
        stripeForm={stripeForm}
      />
      <HandleFilesForm setFiles={setFiles} />
      <Button type="submit" className="w-full">
        Envoyer
      </Button>
    </form>
  );
}
