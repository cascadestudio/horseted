"use client";

import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import CreateStripeAccountForm from "./CreateStripeAccountForm";
import HandleFilesForm from "./HandleFilesForm";
import Button from "@/components/Button";
import { objectToFormData } from "@/utils/objectToFormData";
import Spinner from "@/components/Spinner";

export default function Transactions() {
  const { user, accessToken } = useAuthContext();
  const [files, setFiles] = useState({
    frontDocument: null,
    backDocument: null,
    frontAdditionalDocument: null,
    backAdditionalDocument: null,
  });

  const [isLoading, setIsLoading] = useState(false);

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
    checkFormValidity();
    setIsLoading(true);
    await postFiles();
    setIsLoading(false);
  };

  const checkFormValidity = () => {
    const fileInput = document.querySelector('input[name="frontDocument"]');
    if (!fileInput.files.length) {
      alert("Please select a file.");
      return;
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
      <CreateStripeAccountForm />
      <HandleFilesForm setFiles={setFiles} />
      <Button type="submit" className="w-full">
        Envoyer
      </Button>
    </form>
  );
}
