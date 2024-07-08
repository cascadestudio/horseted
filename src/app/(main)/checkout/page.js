"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";
import Delivery from "./Delivery";
import Address from "./Address";
import { useAuthContext } from "@/context/AuthContext";
import handleSocketPayment from "@/libs/socket/handleSocketPayment";

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
      const paymentIntenturl = paymentResponse.nextAction.url;
      const paymentIntentId = getPaymentIntentIdFromUrl(paymentIntenturl);
      handleSocketPayment(paymentIntentId);
      window.open(paymentIntenturl, "_blank");
    }
  }

  function getPaymentIntentIdFromUrl(url) {
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
    const paymentIntentId = params.get("payment_intent");
    return paymentIntentId;
  }
};

export default withAuth(CheckOutPage);
