import Button from "@/components/Button";
import { ISOtoShortDate } from "@/utils/formatDate";
import Link from "next/link";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { getOrder, patchOrderIsReceived } from "@/fetch/orders";
import { useThreadsContext } from "../context/ThreadsContext";

export default function OrderInfo() {
  const { accessToken, setOrder, orderTracking, recipient, user, order } =
    useThreadsContext();
  const [isReviewModal, setIsReviewModal] = useState(false);

  const handleIsOrderReceived = async () => {
    await patchOrderIsReceived(accessToken);
    const order = await getOrder(accessToken, order.id);
    setOrder(order);
    setIsReviewModal(true);
  };

  const userType = user.id === order.userId ? "buyer" : "seller";

  if (!orderTracking.statuses) return;

  return (
    <>
      {orderTracking.statuses.map((status) => {
        if (status.status === "readyToSend") {
          return (
            <div key={status.status}>
              <p className="font-mcqueen text-lg font-bold text-light-green mb-1">
                Commande validée !
              </p>
              <p className="text-sm font-poppins font-medium mb-3">
                La commande est validée et en attente de livraison
                {userType === "buyer" && " par l'acheteur"}
                {userType === "seller" && " de votre part"}.
              </p>
            </div>
          );
        }
        if (status.status === "delivered") {
          return (
            <div key={status.status}>
              {userType === "seller" &&
                (order.received ? (
                  <>
                    <p className="font-mcqueen text-lg font-bold text-light-green">
                      Colis livré
                    </p>
                    <Button onClick={() => setIsReviewModal(true)}>
                      Laisser un avis
                    </Button>
                  </>
                ) : (
                  <p className="font-mcqueen text-lg font-bold text-light-green">
                    Confirmation de livraison requise par l'acheteur !
                  </p>
                ))}
              {/* {userType === "buyer" &&
                (order.received ? (
                  <p className="font-mcqueen text-lg font-bold text-light-green">
                    Évaluation ajoutée
                  </p>
                ) : (
                  <>
                    <p className="font-mcqueen text-lg font-bold text-light-green">
                      Confirmation de livraison requise !
                    </p>
                    <div className="flex items-center justify-between">
                      <Button onClick={handleIsOrderReceived}>
                        Confirmer la réception
                      </Button>
                      <Link
                        className="text-dark-green text-xs underline"
                        href="/contact"
                      >
                        Ouvrir un litige
                      </Link>
                    </div>
                  </>
                ))} */}
            </div>
          );
        }
        if (status.status === "shipping") {
          return (
            <div key={status.status}>
              <p className="text-sm font-poppins font-medium mb-3">
                Commande en cour de livraison
              </p>
            </div>
          );
        }
        if (status.status === "availableAtServicePoint") {
          return (
            <div key={status.status}>
              <p className="text-sm font-poppins font-medium mb-3">
                Disponible en point relais
              </p>
            </div>
          );
        }
        if (status.status === "late") {
          return (
            <div key={status.status}>
              <p className="text-sm font-poppins font-medium mb-3">
                Commande en retard
              </p>
            </div>
          );
        }
      })}

      <div className="p-5 mt-3 border-dark-green border rounded-xl">
        <div className="flex items-center mb-3">
          <img src="/icons/delivery-check.svg" alt="" />
          <div className="ml-5">
            <p className="font-medium">Numéro de suivi colissimo créé</p>
            <a
              href={orderTracking.url}
              target="_blank"
              rel="noreferrer"
              className="relative"
            >
              <span className="font-bold font-poppins">
                {orderTracking.number}
              </span>
              <img
                className="relative top-[-6px] ml-[2px] inline-block"
                src="/icons/external-link.svg"
                alt=""
              />
            </a>
            <p className="text-sm font-poppins text-grey">
              {ISOtoShortDate(orderTracking.createdAt)}
            </p>
          </div>
        </div>
        {orderTracking.statuses.map((status, index) => {
          if (status.status === "readyToSend") {
            return (
              <div key={index} className="flex items-center mb-3">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium">Colis envoyé</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "delivered") {
            return (
              <div className="flex items-center bg-dark-green rounded-lg p-5 mx-[-20px] mb-[-20px] ">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium text-white">Commande livrée</p>
                  <p className="text-sm font-poppins text-pale-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "shipping") {
            return (
              <div className="flex items-center mb-3">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium">Colis en cours de livraison</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "availableAtServicePoint") {
            return (
              <div className="flex items-center mb-3">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium">
                    Colis Arrivé au point de livraison
                  </p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "late") {
            return (
              <div className="flex items-center mb-3">
                <div className="ml-10">
                  <p className="font-medium text-red-500">Colis en retard</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
      {isReviewModal && (
        <ReviewModal
          setIsReviewModal={setIsReviewModal}
          orderId={order.id}
          recipient={recipient}
        />
      )}
    </>
  );
}
