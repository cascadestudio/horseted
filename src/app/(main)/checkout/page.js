"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";
import Delivery from "./Delivery";
import Address from "./Address";
import { useAuthContext } from "@/context/AuthContext";
import { initializeSocket, getSocket } from "@/libs/socket";

const CheckOutPage = () => {
  const { accessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeAddress, setActiveAddress] = useState(null);
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [activeServicePointId, setActiveServicePointId] = useState(null);

  useEffect(() => {
    getProduct();
    const socket = initializeSocket();
  }, []);

  async function handlePayment() {
    const orderId = await postOrders();
    // console.log("orderId", orderId);
    const paymentResponse = await ordersPayment(orderId);
    // console.log("paymentResponse", paymentResponse);

    handlePaymentResponse(paymentResponse);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="font-mcqueen font-bold text-2xl mb-5">{product.title}</h1>
      <Address setActiveAddress={setActiveAddress} />
      <Delivery
        activeAddress={activeAddress}
        productIds={productId}
        shippingMethods={shippingMethods}
        setShippingMethods={setShippingMethods}
        activeServicePointId={activeServicePointId}
        setActiveServicePointId={setActiveServicePointId}
      />
      <PaymentMethods
        activePaymentMethodId={activePaymentMethodId}
        setActivePaymentMethodId={setActivePaymentMethodId}
      />
      {activePaymentMethodId ? (
        <button className="bg-black text-white" onClick={() => handlePayment()}>
          Payer
        </button>
      ) : null}
    </div>
  );

  async function getProduct() {
    const product = await fetchHorseted(`/products/${productId}`);
    setProduct(product);
    setLoading(false);
  }

  async function postOrders() {
    const parsedProductId = parseInt(productId);
    const body = {
      productIds: [parsedProductId],
    };
    const order = await fetchHorseted(`/orders`, accessToken, "POST", body);
    return order.id;
  }

  async function ordersPayment(orderId) {
    const body = {
      // offerId: null, // required if offer exist
      paymentMethod: activePaymentMethodId,
      address: {
        city: activeAddress.city,
        street: activeAddress.street,
        postalCode: activeAddress.postalCode,
      },
      shippingMethod: shippingMethods[0].id,
      // servicePoint: activeServicePointId, // not required
    };
    // console.log("body", body);
    const paymentResponse = await fetchHorseted(
      `/orders/${orderId}/payment`,
      accessToken,
      "POST",
      body
    );
    return paymentResponse;
  }

  function handlePaymentResponse(paymentResponse) {
    if (paymentResponse.status === "success") {
      console.log("Payment successful");
    }
    if (paymentResponse.status === "requires_action") {
      const url = new URL(paymentResponse.nextAction.url);
      // console.log("url", url);
      getPaymentIntentIdFromUrl(url);
    }
  }

  function getPaymentIntentIdFromUrl(url) {
    const params = new URLSearchParams(url.search);
    // console.log("params", params);
    const paymentIntentId = params.get("payment_intent");
    console.log("paymentIntentId", paymentIntentId);
  }
};

export default withAuth(CheckOutPage);
