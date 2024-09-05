"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import Spinner from "@/components/Spinner";
import Breadcrumbs from "@/components/Breadcrumbs";
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

  const breadcrumbs = [{ label: "Accueil", href: "/" }, { label: "Catalogue" }];

  if (isLoading) return <Spinner isFullScreen />;

  return (
    <div className="min-h-screen flex flex-col lg:pb-10 lg:pt-0">
      <div className="container mx-auto px-5">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="font-mcqueen font-bold text-[24px] mb-4 lg:text-[38px] lg:leading-[48px]">
          Vendre un article
        </h1>
      </div>
      {isUserSeller ? (
        postResponse ? (
          <ProductSummary postResponse={postResponse} />
        ) : (
          <PostProductForm
            accessToken={accessToken}
            setPostResponse={setPostResponse}
            setIsLoading={setIsLoading}
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
