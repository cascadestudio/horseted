"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";
import DeliveryMethods from "./DeliveryMethods";
import AddressForm from "./Address";
import { useAuthContext } from "@/context/AuthContext";
import handleSocketPayment from "@/libs/socket/handleSocketPayment";
import ClientProductImage from "@/components/ClientProductImage";
import UserForm from "./User";

const CheckOutPage = () => {
  const { user, accessToken } = useAuthContext();
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
    const paymentResponse = await ordersPayment(orderId);

    handlePaymentResponse(paymentResponse);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-mcqueen font-bold text-2xl mb-4">Votre commande</h1>
      <div className="g-block flex justify-between">
        <div>
          <h2 className="font-bold text-lg">{product.title}</h2>
          <p>1 article</p>
          <ClientProductImage
            product={product}
            size="small"
            className="w-10 mt-5"
          />
        </div>
        <p className="font-bold text-lg">{product.price}€</p>
      </div>
      <UserForm user={user} />
      <AddressForm setActiveAddress={setActiveAddress} />
      <DeliveryMethods
        productSize={product.shipping}
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
      window.open(paymentIntenturl, "_blank");
      const paymentIntentId = getPaymentIntentIdFromUrl(paymentIntenturl);
      handleSocketPayment(paymentIntentId);
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
