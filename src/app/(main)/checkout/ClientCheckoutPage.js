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
import Alert from "@/components/Alert";
import { postOrder, postOrderPayment } from "@/fetch/orders";
import { getOffer } from "@/fetch/offers";
import { getFees } from "@/fetch/fees";
import { formatPrice } from "@/utils/formatNumber";

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
  const [shippingMethods, setShippingMethods] = useState(null);
  const [activeServicePoint, setActiveServicePoint] = useState(null);
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("home");
  const [productIds, setProductIds] = useState([]);
  const [offer, setOffer] = useState(null);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const [summaryPrices, setSummaryPrices] = useState({
    productsPrice: 0,
    shippingPrice: 0,
    protectionPrice: "2,16 €",
    totalPrice: 0,
  });

  useEffect(() => {
    const productIdsParam = searchParams.get("productIds");
    const offerId = searchParams.get("offerId");

    if (productIdsParam) {
      const productIdsParamArray = productIdsParam
        .split(";")
        .map((id) => parseInt(id, 10));

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

  useEffect(() => {
    if (productIds && selectedShippingMethod && shippingMethods) {
      handleSummaryPrices();
    }
  }, [productIds, selectedShippingMethod, shippingMethods]);

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
      orderId = await postOrder(accessToken, {
        productIds: productIds,
      });
    }
    const paymentResponse = await handleOrdersPayment(orderId);
    await handlePaymentResponse(paymentResponse);
    if (!isAddressSaved && !isDefaultAddress) {
      const query = `/users/me/addresses/${activeAddress.id}`;
      await fetchHorseted(query, accessToken, "DELETE");
    }
    setLoading(false);
  }

  async function getProduct(productId) {
    const product = await fetchHorseted(`/products/${productId}`);
    setProducts((prevProducts) => [...prevProducts, product]);
    setLoading(false);
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
      shippingMethod: selectedShippingMethod?.id,
      servicePoint: activeServicePoint?.id || null,
    };
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

  const handleSummaryPrices = async () => {
    let productsPriceSum;
    let shippingPrice;
    let totalPrice;

    if (offer) {
      productsPriceSum = offer.price;
    } else {
      productsPriceSum = products.reduce(
        (total, product) => total + product.price,
        0
      );
    }

    const protectionPrice = await getFees(productsPriceSum, accessToken);
    const protectionPriceInEuros = protectionPrice / 100;

    const productsPriceSumInEuros = productsPriceSum / 100;

    if (shippingMethods && selectedShippingMethod) {
      shippingPrice = shippingMethods[selectedShippingMethod][0].price || 0; // Already in euros
    }

    totalPrice =
      productsPriceSumInEuros + protectionPriceInEuros + shippingPrice;

    setSummaryPrices({
      productsPrice: formatPrice(productsPriceSumInEuros),
      protectionPrice: formatPrice(protectionPriceInEuros),
      shippingPrice: formatPrice(shippingPrice),
      totalPrice: formatPrice(totalPrice),
    });
  };

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
              <p className="font-bold text-lg">
                {summaryPrices.productsPrice} €
              </p>
            </div>
            <Address
              activeAddress={activeAddress}
              setActiveAddress={setActiveAddress}
              isAddressSaved={isAddressSaved}
              setIsAddressSaved={setIsAddressSaved}
              setIsDefaultAddress={setIsDefaultAddress}
            />
            {activeAddress && (
              <DeliveryMethods
                productSize={products[0].shipping}
                activeAddress={activeAddress}
                productIds={productIds}
                shippingMethods={shippingMethods}
                setShippingMethods={setShippingMethods}
                activeServicePoint={activeServicePoint}
                setActiveServicePoint={setActiveServicePoint}
                selectedShippingMethod={selectedShippingMethod}
                setSelectedShippingMethod={setSelectedShippingMethod}
              />
            )}
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
                <p className="justify-self-end">
                  {summaryPrices.productsPrice} €
                </p>
                <p>Protection acheteur</p>
                <p className="justify-self-end">
                  {summaryPrices.protectionPrice} €
                </p>
                <p>Frais de port</p>
                <p className="justify-self-end">
                  {summaryPrices.shippingPrice} €
                </p>
                <p className="font-extrabold">Total</p>
                <p className="font-extrabold justify-self-end">
                  {summaryPrices.totalPrice} €
                </p>
              </div>
              <Button
                className="mt-12 w-full"
                onClick={handlePayment}
                disabled={
                  !activePaymentMethodId ||
                  !activeAddress ||
                  !selectedShippingMethod
                }
              >
                Payer
              </Button>
              <p className="mt-3 font-semibold text-center">
                Paiement sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>
      {alert.message !== "" && <Alert type={alert.type}>{alert.message}</Alert>}
    </StripeProvider>
  );
};

export default withAuth(CheckOutPage);
