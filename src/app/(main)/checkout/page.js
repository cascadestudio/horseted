"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";

const CheckOutPage = () => {
  // TODO : Click on "Payer" => POST /orders
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState({});
  const { user, accessToken } = useAuthContext();

  useEffect(() => {
    getProduct(productId, setProduct);
    postOrders(accessToken, productId);
  }, []);

  return (
    <div>
      {product.title}
      <PaymentMethods />
    </div>
  );
};

async function getProduct(productId, setProduct) {
  const product = await fetchHorseted(`/products/${productId}`);
  setProduct(product);
}

async function postOrders(accessToken, productId) {
  productId = parseInt(productId);
  const body = {
    productIds: [productId],
  };
  const response = await fetchHorseted(`/orders`, accessToken, "POST", body);
  console.log("response", response);
}

export default withAuth(CheckOutPage);
