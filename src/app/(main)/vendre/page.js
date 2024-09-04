"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import CloseButton from "@/assets/icons/CloseButton";

import Spinner from "@/components/Spinner";

import ProductSummary from "./ProductSummary";
import withAuth from "@/hoc/withAuth";
import PostProductForm from "./PostProductForm";

const SellPage = () => {
  const { accessToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [postResponse, setPostResponse] = useState(null);
  const [isUserSeller, setUserIsSeller] = useState(false);

  // console.log("user =>", user);

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchHorseted(
        "/users/me/seller_account",
        accessToken
      );
      setUserIsSeller(true);
    } catch (error) {
      setUserIsSeller(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner isFullScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-light-grey">
      <div className="bg-white">
        <div className="flex justify-between container mx-auto px-5 py-2">
          <div className="flex items-center">
            <CloseButton className="cursor-pointer h-7 w-7 lg:h-10 lg:w-10" />
            <span className="font-mcqueen font-bold lg:text-[24px] lg:leading-[48px] ml-4 lg:ml-10">
              Vendre un article
            </span>
          </div>
        </div>
      </div>
      {isUserSeller ? (
        postResponse ? (
          <ProductSummary postResponse={postResponse} />
        ) : (
          <PostProductForm
            accessToken={accessToken}
            setPostResponse={setPostResponse}
          />
        )
      ) : (
        <div className="container mx-auto px-5 pt-5 flex flex-col items-center gap-7">
          <h1 className="font-mcqueen font-bold text-3xl mb-5">
            Vous n'avez pas de compte vendeur. Créez-en un !
          </h1>
        </div>
      )}
    </div>
  );
};

export default withAuth(SellPage);
