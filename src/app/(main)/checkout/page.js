"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";
import Delivery from "./Delivery";
import Address from "./Address";

const CheckOutPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState(null);
  const [activeAddress, setActiveAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: get shipping method then post orders payment
  useEffect(() => {
    getProduct();
    // postOrders(accessToken, productId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="font-mcqueen font-bold text-2xl mb-5">{product.title}</h1>
      <Address setActiveAddress={setActiveAddress} />
      <Delivery activeAddress={activeAddress} productIds={productId} />
      <PaymentMethods />
    </div>
  );

  async function getProduct() {
    const product = await fetchHorseted(`/products/${productId}`);
    setProduct(product);
    setLoading(false);
  }
};

async function postOrders(accessToken, productId) {
  productId = parseInt(productId);
  const body = {
    productIds: [productId],
  };
  const response = await fetchHorseted(`/orders`, accessToken, "POST", body);
  // console.log("response", response);
}

export default withAuth(CheckOutPage);
