"use client";

import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import CreateSellerAccount from "./CreateSellerAccount";
import DisplaySellerAccount from "./DisplaySellerAccount";

export default function Transactions() {
  const { user, accessToken } = useAuthContext();
  const [sellerData, setSellerData] = useState(null);

  // console.log("sellerData =>", sellerData);

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    const response = await fetchHorseted(
      "/users/me/seller_account",
      accessToken
    );
    console.log("getSellerData =>", response);
    setSellerData(response);
  };

  if (sellerData === null)
    return (
      <CreateSellerAccount
        accessToken={accessToken}
        user={user}
        getSellerData={getSellerData}
      />
    );

  return <DisplaySellerAccount sellerData={sellerData} />;
}
