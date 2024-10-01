"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import CreateSellerAccount from "./CreateSellerAccount";
import DisplaySellerAccount from "./DisplaySellerAccount";
import { getSeller } from "@/fetch/seller";

export default function Transactions() {
  const { user, accessToken } = useAuthContext();
  const [sellerData, setSellerData] = useState(null);
  const [isUserSeller, setUserIsSeller] = useState(false);

  console.log("sellerData =>", sellerData);

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    try {
      const seller = await getSeller(accessToken);
      setSellerData(seller);
      setUserIsSeller(true);
    } catch (error) {
      setUserIsSeller(false);
    }
  };

  if (!isUserSeller)
    return (
      <CreateSellerAccount
        accessToken={accessToken}
        user={user}
        getSellerData={getSellerData}
      />
    );

  return <DisplaySellerAccount sellerData={sellerData} />;
}
