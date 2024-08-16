"use client";

import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import CreateSellerAccount from "./CreateSellerAccount";
import DisplaySellerAccount from "./DisplaySellerAccount";
import Spinner from "@/components/Spinner";

export default function Transactions() {
  const { user, accessToken } = useAuthContext();
  const [sellerData, setSellerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("sellerData =>", sellerData);

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    const response = await fetchHorseted(
      "/users/me/seller_account",
      accessToken
    );
    setIsLoading(false);
    setSellerData(response);
  };

  if (isLoading) return <Spinner />;

  // if (sellerData === null)
  return <CreateSellerAccount accessToken={accessToken} user={user} />;

  // return <DisplaySellerAccount sellerData={sellerData} user={user} />;
}
