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

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    try {
      const seller = await getSeller(accessToken);
      if (seller) {
        setSellerData(seller);
        setUserIsSeller(true);
      } else {
        setUserIsSeller(false);
      }
    } catch (error) {
      setUserIsSeller(false);
    }
  };

  if (!isUserSeller) {
    return (
      <CreateSellerAccount
        accessToken={accessToken}
        user={user}
        getSellerData={getSellerData}
      />
    );
  } else {
    return <DisplaySellerAccount sellerData={sellerData} />;
  }
}
