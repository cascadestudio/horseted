"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";
import Delivery from "./Delivery";
import Address from "./Address";
import { useAuthContext } from "@/context/AuthContext";

const CheckOutPage = () => {
  const { accessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [activeAddress, setActiveAddress] = useState(null);
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);

  useEffect(() => {
    getProduct();
    postOrders(accessToken, productId);
  }, []);

  async function handlePayment() {
    // TODO: gather all info then post orders payment
    const body = {
      offerId: orderId,
      paymentMethod: "string",
      address: {
        city: "string",
        street: "string",
        postalCode: "string",
      },
      shippingMethod: 0,
      servicePoint: 0,
    };
    const payment = await fetchHorseted(
      `/orders/${orderId}/payments`,
      accessToken,
      "POST",
      body
    );
    console.log("payment", payment);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="font-mcqueen font-bold text-2xl mb-5">{product.title}</h1>
      <Address setActiveAddress={setActiveAddress} />
      <Delivery activeAddress={activeAddress} productIds={productId} />
      <PaymentMethods
        activePaymentMethodId={activePaymentMethodId}
        setActivePaymentMethodId={setActivePaymentMethodId}
      />
      <button className="bg-black text-white" onClick={() => handlePayment()}>
        Payer
      </button>
    </div>
  );

  async function getProduct() {
    const product = await fetchHorseted(`/products/${productId}`);
    setProduct(product);
    setLoading(false);
  }

  async function postOrders(accessToken, productId) {
    productId = parseInt(productId);
    const body = {
      productIds: [productId],
    };
    const order = await fetchHorseted(`/orders`, accessToken, "POST", body);
    console.log("order", order);
    setOrderId(order.id);
  }
};

export default withAuth(CheckOutPage);
