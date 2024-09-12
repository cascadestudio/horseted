"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";
import DeliveryMethods from "./DeliveryMethods";
import Address from "./Address";
import { useAuthContext } from "@/context/AuthContext";
import handleSocketPayment from "@/libs/socket/handleSocketPayment";
import ClientProductImage from "@/components/ClientProductImage";
import UserForm from "./User";
import Button from "@/components/Button";
import StripeProvider from "@/components/StripeProvider";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { centsToEuros } from "@/utils/centsToEuros";
import Alert from "@/components/Alert";
import { formatNumber } from "@/utils/formatNumber";

const CheckOutPage = () => {
  const router = useRouter();
  const { user, accessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [activeServicePoint, setActiveServicePoint] = useState(null);
  const [productIds, setProductIds] = useState([]);
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  // console.log("isAddressSaved =>", isAddressSaved);

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
    setLoading(true);
    const orderId = await postOrders();
    const paymentResponse = await ordersPayment(orderId);
    await handlePaymentResponse(paymentResponse);
    setLoading(false);
  }

  const productsPriceSum = () => {
    return products.reduce((total, product) => {
      const sum = total + product.price;
      return centsToEuros(sum);
    }, 0);
  };

  async function getProduct(productId) {
    const product = await fetchHorseted(`/products/${productId}`);
    setProducts((prevProducts) => [...prevProducts, product]);
    setLoading(false);
  }

  async function postOrders() {
    const parsedProductIds = parseInt(productIds);
    const body = {
      productIds: [parsedProductIds],
    };
    console.log(body);
    const order = await fetchHorseted(
      `/orders`,
      accessToken,
      "POST",
      body,
      true
    );
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
      body,
      true
    );
    return paymentResponse;
  }

  async function handlePaymentResponse(paymentResponse) {
    //  processing, requiresAction, requiresCapture, requiresConfirmation, requiresPaymentMethod, succeded
    switch (paymentResponse.status) {
      case "canceled":
        setAlert({
          type: "error",
          message:
            "Votre paiement a échoué, veuillez réessayer pour confirmer votre commande",
        });
        break;
      case "succeeded":
        setAlert({
          type: "success",
          message: "Paiement validé",
        });
        router.push(`/messagerie`);
        break;
      case "requires_action":
        const paymentIntenturl = paymentResponse.nextAction.url;
        window.open(paymentIntenturl, "_blank");
        const paymentIntentId = getPaymentIntentIdFromUrl(paymentIntenturl);
        handleSocketPayment(paymentIntentId);
        setAlert({
          type: "info",
          message: "Veuillez confirmer votre paiement",
        });
        break;
      case "processing":
        setAlert("Payment canceled");
        setAlert({
          type: "error",
          message: "Le paiement a été annulé",
        });
        break;
      case "requiresCapture":
        setAlert({
          type: "info",
          message: "Le paiement requires capture",
        });
        break;
      case "requiresConfirmation":
        setAlert({
          type: "info",
          message: "Le paiement requires confirmation",
        });
        break;
      case "requiresPaymentMethod":
        setAlert({
          type: "info",
          message: "Veuiller renseigner une carte de paiement",
        });
        break;
      default:
        break;
    }
  }

  function getPaymentIntentIdFromUrl(url) {
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
    const paymentIntentId = params.get("payment_intent");
    return paymentIntentId;
  }

  if (loading) {
    return <Spinner isFullScreen />;
  }

  return (
    <StripeProvider>
      <div className="container mx-auto py-10 px-5">
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
                <p>
                  {products.length} article{products.length > 1 ? "s" : ""}
                </p>
                <div className="flex">
                  {products.map((product) => (
                    <ClientProductImage
                      key={product.id}
                      product={product}
                      size="small"
                      className="w-10 mt-5 mr-5"
                    />
                  ))}
                </div>
              </div>
              <p className="font-bold text-lg">{productsPriceSum()} €</p>
            </div>
            <Address
              activeAddress={activeAddress}
              setActiveAddress={setActiveAddress}
              isAddressSaved={isAddressSaved}
              setIsAddressSaved={setIsAddressSaved}
            />
            <DeliveryMethods
              productSize={products[0].shipping}
              activeAddress={activeAddress}
              productIds={productIds}
              shippingMethods={shippingMethods}
              setShippingMethods={setShippingMethods}
              activeServicePoint={activeServicePoint}
              setActiveServicePoint={setActiveServicePoint}
              isAddressSaved={isAddressSaved}
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
                {shippingMethods[0] && (
                  <>
                    <p>Frais de port</p>
                    <p className="justify-self-end">
                      {shippingMethods[0]?.price} €
                    </p>
                    <p className="font-extrabold">Total</p>
                    <p className="font-extrabold justify-self-end">
                      {formatNumber(
                        parseFloat(productsPriceSum().replace(",", ".")) +
                          parseFloat(shippingMethods[0]?.price || 0)
                      )}{" "}
                      €
                    </p>
                  </>
                )}
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
      {alert.message !== "" && <Alert type={alert.type}>{alert.message}</Alert>}
    </StripeProvider>
  );
};

export default withAuth(CheckOutPage);
