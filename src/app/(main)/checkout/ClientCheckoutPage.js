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
import Button from "@/components/Button";
import StripeProvider from "@/components/StripeProvider";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { centsToEuros } from "@/utils/centsToEuros";
import Alert from "@/components/Alert";
import { formatNumber } from "@/utils/formatNumber";
import { postOrderPayment } from "@/fetch/orders";
import { getOffer } from "@/fetch/offers";

export async function generateMetadata() {
  const title = "Votre commande | Horseted";
  const description =
    "Résumé de votre commande sur Horseted. Veuillez vérifier les articles et confirmer votre achat.";
  const image = product?.image?.url || null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          alt: `Image du produit ${product.title}`,
        },
      ],
    },
  };
}

const CheckOutPage = () => {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [activeServicePoint, setActiveServicePoint] = useState(null);
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [activeDeliveryMethodId, setActiveDeliveryMethodId] = useState(null);
  const [productIds, setProductIds] = useState([]);
  const [offer, setOffer] = useState(null);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    const productIdsParam = searchParams.get("productIds");
    const offerId = searchParams.get("offerId");
    if (productIdsParam) {
      const productIdsParamArray = productIdsParam.split(";");
      setProductIds(productIdsParamArray);
    }
    if (offerId) {
      handleGetOffer(offerId);
    }
  }, [searchParams]);

  useEffect(() => {
    productIds.map((productId) => {
      getProduct(productId);
    });
  }, [productIds]);

  const handleGetOffer = async (offerId) => {
    const offer = await getOffer(accessToken, offerId);
    setOffer(offer);
  };

  async function handlePayment() {
    setLoading(true);
    let orderId;
    if (offer) {
      orderId = searchParams.get("orderId");
    } else {
      orderId = await postOrders();
    }
    const paymentResponse = await handleOrdersPayment(orderId);
    await handlePaymentResponse(paymentResponse);
    if (!isAddressSaved) {
      const query = `/users/me/addresses/${activeAddress.id}`;
      await fetchHorseted(query, accessToken, "DELETE");
    }
    setLoading(false);
  }

  const handleProductsPrice = () => {
    if (offer) {
      return offer.price ? centsToEuros(offer.price) : "0,00";
    } else {
      const productsPriceSum = products.reduce((total, product) => {
        const sum = total + product.price;
        return sum;
      }, 0);
      return centsToEuros(productsPriceSum);
    }
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

  async function handleOrdersPayment(orderId) {
    const body = {
      offerId: offer?.id || null,
      paymentMethod: activePaymentMethodId,
      address: {
        fullName: activeAddress.fullName,
        city: activeAddress.city,
        street: activeAddress.street,
        postalCode: activeAddress.postalCode,
      },
      shippingMethod: activeDeliveryMethodId,
      servicePoint: activeServicePoint?.id || null,
    };
    console.log(body);
    const paymentResponse = await postOrderPayment(accessToken, orderId, body);
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
              <p className="font-bold text-lg">{handleProductsPrice()} €</p>
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
              activeDeliveryMethodId={activeDeliveryMethodId}
              setActiveDeliveryMethodId={setActiveDeliveryMethodId}
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
                <p className="justify-self-end">{handleProductsPrice()} €</p>
                {shippingMethods[0] && (
                  <>
                    <p>Frais de port</p>
                    <p className="justify-self-end">
                      {shippingMethods[0]?.price} €
                    </p>
                    <p className="font-extrabold">Total</p>
                    <p className="font-extrabold justify-self-end">
                      {formatNumber(
                        parseFloat(handleProductsPrice().replace(",", ".")) +
                          parseFloat(
                            centsToEuros(
                              shippingMethods[0]?.price || 0
                            ).replace(",", ".")
                          )
                      )}{" "}
                      €
                    </p>
                  </>
                )}
              </div>
              <>
                <Button
                  className="mt-12 w-full"
                  onClick={handlePayment}
                  disabled={
                    !activePaymentMethodId ||
                    !activeAddress ||
                    !activeDeliveryMethodId
                  }
                >
                  Payer
                </Button>
                <p className="mt-3 font-semibold text-center">
                  Paiement sécurisé
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
      {alert.message !== "" && <Alert type={alert.type}>{alert.message}</Alert>}
    </StripeProvider>
  );
};

export default withAuth(CheckOutPage);
