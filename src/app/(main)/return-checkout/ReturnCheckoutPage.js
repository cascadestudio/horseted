"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import Address from "@/components/Address";
import PaymentMethods from "@/components/PaymentMethods";
import { useAuthContext } from "@/context/AuthContext";
import handleSocketPayment from "@/libs/socket/handleSocketPayment";

import StripeProvider from "@/components/StripeProvider";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Alert from "@/components/Alert";
import { getOrder } from "@/fetch/orders";
import { formatPrice } from "@/utils/formatNumber";
import { getShippingMethods } from "@/fetch/delivery";
import { postReturnPayment, getDisputeById } from '@/fetch/disputes';
import Button from "@/components/Button";
import Link from "next/link";

const ReturnCheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { accessToken } = useAuthContext();
  const [shippingMethod, setShippingMethod] = useState(0);

  const [dispute, setDispute] = useState(null);
  const [order, setOrder] = useState(null);
  
  const [activeAddress, setActiveAddress] = useState(null);
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetShippingMethod();
  }, [searchParams]);

  const handleGetShippingMethod = async () => {
    const disputeId = searchParams.get('disputeId');
    const dispute = await getDisputeById(accessToken, disputeId);
    setDispute(dispute);

    const orderRes = await getOrder(accessToken, dispute.orderId);
    setOrder(orderRes);

    const productIds = orderRes.items.map(i => i.productId);

    const shippingMethods = await getShippingMethods(null, productIds, null, accessToken);
    setShippingMethod(shippingMethods[0]);    

    setLoading(false);
  }

  function getPaymentIntentIdFromUrl(url) {
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
    const paymentIntentId = params.get("payment_intent");
    return paymentIntentId;
  }  

  async function handlePaymentResponse(paymentResponse) {      
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
        router.push(`/messagerie?orderId=${dispute.orderId}`);
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

  async function handlePayment() {
    setLoading(true);

    const paymentResponse = await postReturnPayment(accessToken, dispute.id, { shippingMethod: shippingMethod.id, paymentMethod: activePaymentMethodId, address: activeAddress});
    await handlePaymentResponse(paymentResponse);
    if (!isAddressSaved && !isDefaultAddress) {
      const query = `/users/me/addresses/${activeAddress.id}`;
      await fetchHorseted(query, accessToken, "DELETE");
    }

    setLoading(false);
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
            <div className="mb-[10px] flex flex-row justify-between g-block">
              <div className="flex flex-col">
                <span className="font-raleway font-extrabold text-[16px]">Frais de retour</span>
                { order &&
                  <span className="font-raleway font-medium text-[14px]">{order.items.length} articles</span>
                }
              </div>
              { shippingMethod &&
                <span className="font-raleway font-extrabold text-[16px]">{formatPrice(shippingMethod.price)}€</span>
              }                
            </div>            
            <Address
              title={"Adresse de facturation"}
              activeAddress={activeAddress}
              setActiveAddress={setActiveAddress}
              isAddressSaved={isAddressSaved}
              setIsAddressSaved={setIsAddressSaved}
              setIsDefaultAddress={setIsDefaultAddress}
            />
            <PaymentMethods
              activePaymentMethodId={activePaymentMethodId}
              setActivePaymentMethodId={setActivePaymentMethodId}
            />
          </div>
          <div className="col-span-1">
            <div className="g-block">
              <h2 className="font-bold mb-7">Résumé de la commande</h2>
              { shippingMethod &&
                <div className="grid grid-cols-2 gap-y-1 justify-between font-semibold">
                  <p className="font-raleway font-semibold text-[16px]">Frais de retour</p>
                  <p className="font-raleway font-semibold text-[16px] justify-self-end">
                    {formatPrice(shippingMethod.price)} €
                  </p>                
                </div>
              }

              <div className="grid grid-cols-2 gap-y-1 justify-between font-semibold">
                <button
                  className="text-light-green underline font-semibold  font-raleway text-start"
                  onClick={() => {}}
                >
                  Protection acheteur
                  <img
                    className="relative top-[-8px] ml-1 inline-block"
                    src="/icons/external-link.svg"
                    alt=""
                  />
                </button>
                <p className="font-raleway font-semibold text-[16px] justify-self-end">
                  {formatPrice(0)} €
                </p>                
              </div>

              { shippingMethod &&
                <div className="grid grid-cols-2 gap-y-1 justify-between font-semibold mt-[87px]">
                  <p className="font-raleway font-extrabold text-[16px]">Total</p>
                  <p className="font-raleway font-extrabold text-[16px] justify-self-end">
                    {formatPrice(shippingMethod.price)} €
                  </p>                
                </div>
              }              
              <Button
                  className="mt-[27px] w-full"
                  onClick={handlePayment}
                  disabled={
                    !shippingMethod ||
                    !activeAddress ||
                    !activePaymentMethodId
                  }
                >
                  Payer
                </Button>
                <p className="mt-3 font-raleway font-semibold text-center">
                  Paiement sécurisé
                </p>
            </div>
          </div>
        </div>
      </div>
      {alert.message !== "" && <Alert type={alert.type}>{alert.message}</Alert>}
    </StripeProvider>
  );
}

export default withAuth(ReturnCheckoutPage);