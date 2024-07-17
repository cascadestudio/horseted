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
import Button from "@/components/Button";
import StripeProvider from "@/components/StripeProvider";

const CheckOutPage = () => {
  const { user, accessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [activeServicePoint, setActiveServicePoint] = useState(null);
  const [productIds, setProductIds] = useState([]);

  console.log("shippingMethods =>", shippingMethods);

  useEffect(() => {
    const productIdsParam = searchParams.get("productIds");
    if (productIdsParam) {
      const productIdsParamArray = productIdsParam.split(";");
      setProductIds(productIdsParamArray);
    }
  }, [searchParams]);

  useEffect(() => {
    productIds.map((productId) => {
      getProduct(productId);
    });
  }, [productIds]);

  async function handlePayment() {
    const orderId = await postOrders();
    const paymentResponse = await ordersPayment(orderId);
    handlePaymentResponse(paymentResponse);
  }

  const productsPriceSum = () => {
    return products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <StripeProvider>
      <div className="container mx-auto py-10">
        <h1 className="font-mcqueen font-extrabold text-2xl mb-4">
          Votre commande
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
          <div className="col-span-2">
            <div className="g-block flex justify-between">
              <div>
                <h2 className="font-bold text-lg">
                  {products.length > 1 ? "Lot d’articles" : products[0].title}
                </h2>
                <p>{products.length} article</p>
                {products.map((product) => (
                  <ClientProductImage
                    key={product.id}
                    product={product}
                    size="small"
                    className="w-10 mt-5"
                  />
                ))}
              </div>
              <p className="font-bold text-lg">{productsPriceSum()} €</p>
            </div>
            <UserForm user={user} />
            <AddressForm setActiveAddress={setActiveAddress} />
            <DeliveryMethods
              productSize={products[0].shipping}
              activeAddress={activeAddress}
              productIds={productIds}
              shippingMethods={shippingMethods}
              setShippingMethods={setShippingMethods}
              activeServicePoint={activeServicePoint}
              setActiveServicePoint={setActiveServicePoint}
            />
            <PaymentMethods
              activePaymentMethodId={activePaymentMethodId}
              setActivePaymentMethodId={setActivePaymentMethodId}
            />
          </div>
          <div className="col-span-1">
            <div className="g-block">
              <h2 className="font-bold mb-7">Résumé de la commande</h2>
              <div className="grid grid-cols-2 gap-y-1 justify-between font-semibold">
                <p>Commande</p>
                <p className="justify-self-end">{productsPriceSum()} €</p>
                <p>Frais de port</p>
                <p className="justify-self-end">
                  {shippingMethods[0]?.price} €
                </p>
                <p className="font-extrabold">Total</p>
                <p className="font-extrabold justify-self-end">
                  {productsPriceSum() + shippingMethods[0]?.price} €
                </p>
              </div>
              {activePaymentMethodId ? (
                <>
                  <Button
                    className="mt-12 w-full"
                    onClick={() => handlePayment()}
                  >
                    Payer
                  </Button>
                  <p className="mt-3 font-semibold text-center">
                    Paiement sécurisé
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </StripeProvider>
  );

  async function getProduct(productId) {
    const product = await fetchHorseted(`/products/${productId}`);
    setProducts((prevProducts) => [...prevProducts, product]);
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
