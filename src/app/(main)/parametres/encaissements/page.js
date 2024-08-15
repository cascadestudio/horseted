"use client";

import UploadIcon from "@/assets/icons/UploadIcon";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Checkbox from "@/components/input/Checkbox";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import CreateStripeAccount from "./CreateStripeAccount";

export default function Transactions() {
  const { user, accessToken } = useAuthContext();
  const [files, setFiles] = useState({
    frontDocument: null,
    backDocument: null,
    frontAdditionalDocument: null,
    backAdditionalDocument: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // console.log("isLoading =>", isLoading);
  // console.log("files =>", files);

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

  const handleFileChange = (e) => {
    const { name, value, files } = e.target;
    const file = files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = convertToFormData(files);
    setIsLoading(true);
    const response = await fetchHorseted(
      "/users/me/files",
      accessToken,
      "POST",
      formData,
      false,
      true
    );
    setIsLoading(false);
    console.log("response =>", response);
  };

  const convertToFormData = (files) => {
    const formData = new FormData();
    for (const key in files) {
      if (files.hasOwnProperty(key) && files[key] !== null) {
        formData.append(key, files[key]);
      }
    }
    return formData;
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
      <CreateStripeAccount />

      <div className="col-span-2 lg:col-span-1">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Vérification de l’identité
        </h2>
        <h3 className="font-mcqueen font-semibold mb-2">
          Document d’identité :
        </h3>
        <label className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
          <UploadIcon />
          <p className="text-sm font-semibold uppercase text-center">
            Passeport
          </p>
          <input
            onChange={handleFileChange}
            type="file"
            name="frontDocument"
            className="hidden"
          />
        </label>
        <p className="text-center uppercase text-xl">ou</p>
        <p className="text-center uppercase text-light-green mb-2">
          Carte d'identité
        </p>
        <div className="flex gap-8">
          <label className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
            <UploadIcon />
            <p className="text-sm font-semibold uppercase text-center">Recto</p>
            <input
              onChange={handleFileChange}
              type="file"
              name="frontAdditionalDocument"
              className="hidden"
            />
          </label>
          <label className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
            <UploadIcon />
            <p className="text-sm font-semibold uppercase text-center">Verso</p>
            <input
              onChange={handleFileChange}
              type="file"
              name="backAdditionalDocument"
              className="hidden"
            />
          </label>
        </div>
        <label className="flex items-start mt-12 mb-7">
          <Checkbox value="" onChange={() => {}} />
          <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
            J’accepte que mon identité soit vérifiée par Horseted
          </span>
        </label>
        <Button type="submit" className="w-full">
          Envoyer
        </Button>
      </div>
    </form>
  );
}
