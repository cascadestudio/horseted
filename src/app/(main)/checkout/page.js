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
  const [shippingMethods, setShippingMethods] = useState([]);
  const [activeServicePointId, setActiveServicePointId] = useState(null);

  console.log("shippingMethods", shippingMethods);

  useEffect(() => {
    getProduct();
    postOrders(accessToken, productId);
  }, []);

  async function handlePayment() {
    const body = {
      // offerId: null, // required if offer exist
      paymentMethod: activePaymentMethodId,
      address: {
        city: activeAddress.city,
        street: activeAddress.street,
        postalCode: activeAddress.postalCode,
      },
      shippingMethod: shippingMethods[0].id,
      // servicePoint: activeServicePointId,
    };
    console.log("body", body);

    const payment = await fetchHorseted(
      `/orders/${orderId}/payment`,
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

  async function postOrders(accessToken, productId) {
    productId = parseInt(productId);
    const body = {
      productIds: [productId],
    };
    const order = await fetchHorseted(`/orders`, accessToken, "POST", body);
    setOrderId(order.id);
  }
};

export default withAuth(CheckOutPage);
