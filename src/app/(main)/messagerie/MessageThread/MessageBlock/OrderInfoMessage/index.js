import ClientProductImage from "@/components/ClientProductImage";
import Button from "@/components/Button";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Link from "next/link";
import { getOffer } from "@/fetch/offers";
import { useEffect, useState } from "react";
import OrderStatusText from "./OrderStatusText";
import OfferResponseButtons from "./OfferResponseButtons";
import { patchOrderIsReceived } from "@/fetch/orders";
import ReviewModal from "../../../ThreadInfo/ReviewModal";
import { downloadOrderLabel, downloadDisputeLabel } from "@/utils/downloadLabel";
import DisputeCreateModal from "../../../ThreadInfo/DisputeCreateModal";
import DisputeModal from "../../../ThreadInfo/DisputeModal";
import { useRouter } from "next/navigation";

import moment from "moment";
import { postReturnDispute } from "@/fetch/disputes";
import { getParcelById } from "@/fetch/parcels";

export default function OrderInfoMessage({ type, offerId }) {
  const router = useRouter();

  const { order, user, accessToken, products, updateMessages, recipient, dispute, setDispute } =
    useThreadsContext();

  const [offer, setOffer] = useState(null);
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [isDisputeCreateModal, setIsDisputeCreateModal] = useState(false);
  const [isDisputeModal, setIsDisputeModal] = useState(false);
  
  const userRole = getUserRole();

  function getUserRole() {
    if (!order || !user) return;
    if (order.buyer.id === user.id) {
      return "buyer";
    } else if (order.seller.id === user.id) {
      return "seller";
    } else {
      return "unknown";
    }
  }

  useEffect(() => {
    if (!offerId) return;
    handleGetOffer(offerId);
  }, [offerId]);

  const handleGetOffer = async (offerId) => {
    const offer = await getOffer(accessToken, offerId);
    setOffer(offer);
  };

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  const isBuyButton =
    offer?.status === "approved" &&
    user?.id === offer?.userId &&
    order?.status !== "paid";

  const handleConfirmOrderDelivered = async () => {
    await patchOrderIsReceived(order.id, accessToken);
    updateMessages();
  };

  const handleConfirmReturnDelivered = async () => {
    const response = await postReturnDeliveryConfirmation(accessToken, dispute.id);
    setDispute(response);    
    updateMessages();
  };

  const handleReturnTracking = async () => {
    const res = await getParcelById(accessToken, dispute.returnParcelId);
    window.open(res.trackingUrl, '_blank');    
  };

  const handleReturnDispute = async () => {
    const response = await postReturnDispute(accessToken, dispute.id);
    setDispute(response);    
    updateMessages();
  };

  const handlePayReturn = async () => {
    router.push(`/return-checkout?disputeId=${dispute.id}`);
  }

  const isOfferOwner = user?.id === offer?.userId;

  if (type === "addReview" && userRole === "seller") return;

  
  return (
    <>
      <li className="w-full border-y py-2 border-pale-grey flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col gap-y-2">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/commandes/${order.id}`}
              className="flex items-center"
            >
              <ClientProductImage
                key={product.id}
                product={product}
                size="small"
                className="w-24 h-14"
              />
              <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px] capitalize">
                {product.title}
              </div>
              <img
                src="/icons/external-link.svg"
                alt="Chevron"
                className="w-3 h-3 ml-1 mb-3"
              />
            </Link>
          ))}
        </div>
        <OrderStatusText
          type={type}
          totalPrice={totalPrice}
          offerPrice={offer?.price}
          userRole={userRole}
          recipient={recipient}
        />
      </li>
      {type === "newOrder" && userRole === "seller" && (
        <div className="flex justify-end">
          <Button onClick={() => downloadOrderLabel(accessToken, order.id)}>
            Imprimer l'étiquette
          </Button>
        </div>
      )}
      {type === "newOffer" && // is a new offer and
        !isOfferOwner && ( // user is not the offer owner
          <OfferResponseButtons offerId={offerId} totalPrice={totalPrice} />
        )}
      {type === "orderDeliveredConfirmationRequired" && (
        <div className="flex justify-between	items-center">
          <Button variant={"green"} onClick={handleConfirmOrderDelivered}>
            Confirmer la réception
          </Button>
          <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeCreateModal(true)} href=''>
            Ouvrir un litige
          </Link>
        </div>
      )}
      {type === "newDispute" && dispute && (
        <div className="flex justify-between	items-center">
          {
            !dispute.sellerDecision && userRole === 'seller' && moment().diff(dispute.createdAt, 'hour') < 72
              ? <p>Vous avez {72-moment().diff(dispute.createdAt, 'hour')}h pour répondre avant le {moment(dispute.createdAt).add(72, 'hour').format('DD/MM/YYYY HH:mm')}</p>
              : <div/>
          }
          <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeModal(true)} href=''>
            Voir le litige
          </Link>
        </div>
      )}
      { type === "sellerDisputeDecisionReturnAtBuyerCharge" &&  userRole === 'buyer' && dispute && !dispute.returnPaymentId && !dispute.sentToHorseted && (
        <div className="flex justify-between	items-center">
          <Button variant={"green"} onClick={handlePayReturn}>
            Payer le retour
          </Button>                    
          <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeModal(true)} href=''>
            Je ne souhaite pas payer le retour
          </Link>
        </div>
      )}                 
      { type === "sellerDisputeDecisionReturnAtSellerCharge" &&  userRole === 'buyer' && dispute?.returnParcelId && (
        <div className="flex justify-between	items-center">
          <Button onClick={() => downloadDisputeLabel(accessToken, dispute.id)}>
            Imprimer l'étiquette
          </Button>          
        </div>
      )}
      { ((type === "horsetedDisputeDecisionReturnAtSellerCharge" &&  userRole === 'seller' && dispute &&  !dispute.returnPaymentId)
        || (type === "horsetedDisputeDecisionReturnAtBuyerCharge" &&  userRole === 'buyer' && dispute &&  !dispute.returnPaymentId))
        && (
        <div className="flex justify-between	items-center">
          <Button variant={"green"} onClick={handlePayReturn}>
            Payer le retour
          </Button>
        </div>
      )}      
      { (type === "disputeDecisionReturnPaid" || type === "horsetedDisputeDecisionReturnAtHorsetedCharge") && dispute?.returnParcelId && (
        <div className="flex justify-between	items-center">
          <Button onClick={() => downloadDisputeLabel(accessToken, dispute.id)}>
            Imprimer l'étiquette
          </Button>
          <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeModal(true)} href=''>
            Voir le litige
          </Link>
        </div>
      )}
      { type === "orderReturnDeliveredConfirmationRequired" && dispute && !dispute.returnDeliveryConfirmedAt && (
        <div className="flex justify-between	items-center">
          <Button variant={"green"} onClick={handleConfirmReturnDelivered}>
            Confirmer la réception
          </Button>
          <Link className="text-dark-green text-xs underline" onClick={handleReturnDispute} href=''>
            Ouvrir un litige
          </Link>
        </div>
      )}
      { type === "orderReturnSent" &&
        <div className="flex justify-between	items-center">
          <Button variant={"transparent-green"} onClick={handleReturnTracking}>
            Suivre le retour
          </Button>
          <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeModal(true)} href=''>
            Voir le litige
          </Link>
        </div>      
      }
      {type === "addReview" && (
        <div className="flex">
          <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
            Ajouter une évaluation
          </Button>
        </div>
      )}
      {type === "newBuyerReview" &&
        userRole === "seller" &&
        !order.reviewedBySeller && (
          <div className="flex">
            <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
              Ajouter une évaluation
            </Button>
          </div>
        )}
      {type === "newSellerReview" &&
        userRole === "buyer" &&
        !order.reviewedByBuyer && (
          <div className="flex">
            <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
              Ajouter une évaluation
            </Button>
          </div>
        )}
      {isBuyButton && (
        <div className="flex">
          <Button
            withAuth
            href={`/checkout?orderId=${order.id}&offerId=${offer.id}&productIds=${products
              .map((product) => product.id)
              .join(",")}`}
          >
            Acheter
          </Button>
        </div>
      )}      
      {isReviewModal && (
        <ReviewModal
          setIsReviewModal={setIsReviewModal}
          orderId={order.id}
          recipient={recipient}
          userRole={userRole}
        />
      )}
      {
        isDisputeCreateModal && (
          <DisputeCreateModal
            setIsDisputeCreateModal={setIsDisputeCreateModal}            
            orderId={order.id}
          />
        )
      }
      {
        isDisputeModal && (
          <DisputeModal
            setIsDisputeModal={setIsDisputeModal}            
            dispute={dispute}
          />
        )
      }
    </>
  );
}
