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
  const [isLoading, setIsLoading] = useState(false);
  const [accountToken, setAccountToken] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [stripeAccountForm, setStripeAccountForm] = useState({
    // IBAN: "",
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

  // console.log("dateOfBirth =>", dateOfBirth);
  // console.log("stripeAccountForm =>", stripeAccountForm);
  // console.log("accountToken =>", accountToken);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // checkFormValidity();
    setIsLoading(true);
    await createStripeAccount();
    // await postFiles();
    setIsLoading(false);
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

  const checkFormValidity = () => {
    const fileInput = document.querySelector('input[name="frontDocument"]');
    if (!fileInput.files.length) {
      alert("Please select a file.");
      return;
    }
  };

  const createStripeAccount = async () => {
    const stripeAccountFormWithDate = addDateOfBirth();
    try {
      const stripe = await stripePromise;
      const accountToken = await stripe.createToken(
        "account",
        stripeAccountFormWithDate
      );
      setAccountToken(accountToken);
    } catch (error) {
      console.error("Error creating Stripe account:", error);
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
        setStripeAccountForm={setStripeAccountForm}
        stripeAccountForm={stripeAccountForm}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
      />
      <HandleFilesForm setFiles={setFiles} />
      <Button type="submit" className="w-full">
        Envoyer
      </Button>
    </form>
  );
}
