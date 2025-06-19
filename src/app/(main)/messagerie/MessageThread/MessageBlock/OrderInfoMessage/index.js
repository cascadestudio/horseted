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
import { sendToHorseted, postReturnDeliveryConfirmation } from "@/fetch/disputes";
import moment from "moment";
import { postReturnDispute } from "@/fetch/disputes";
import { getParcelById } from "@/fetch/parcels";
import { formatPrice } from "@/utils/formatNumber";

export default function OrderInfoMessage({ message, offerId }) {
  const { type, orderRefundId } = message;

  const router = useRouter();

  const { activeThread, order, user, accessToken, products, updateMessages, recipient, dispute, setDispute, parcel } =
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
    updateMessages(activeThread.id);
  };

  const handleSendToHorseted = async () => {
    const response = await sendToHorseted(accessToken, dispute.id);
    setDispute(response);
    updateMessages(activeThread.id);
  }

  const handleConfirmReturnDelivered = async () => {
    const response = await postReturnDeliveryConfirmation(accessToken, dispute.id);
    setDispute(response);    
    updateMessages(activeThread.id);
  };

  const handleReturnTracking = async () => {
    const res = await getParcelById(accessToken, dispute.returnParcelId);
    window.open(res.trackingUrl, '_blank');    
  };

  const handleReturnDispute = async () => {
    const response = await postReturnDispute(accessToken, dispute.id);
    setDispute(response);    
    updateMessages(activeThread.id);
  };

  const handlePayReturn = async () => {
    router.push(`/return-checkout?disputeId=${dispute.id}`);
  }

  const isOfferOwner = user?.id === offer?.userId;

  if (type === "addReview" && userRole === "seller") return;

  const refundAmount = dispute?.orderRefunds?.find(el => el.id == message.orderRefundId)?.amount;
  
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
          parcel={parcel}
          order={order}
          dispute={dispute}
          orderRefundId={orderRefundId}
        />
      </li>
      {type === "newOrder" && userRole === "seller" && (
        <div className="flex justify-end">
          <Button onClick={() => downloadOrderLabel(accessToken, order.id)}>
            Imprimer l'étiquette
          </Button>
        </div>
      )}
      {type === "offerAccepted" && !isOfferOwner && order?.status !== 'paid' && (
        <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 gap-x-3">
          <Button
            variant={"green"}
            href={`/checkout?orderId=${order?.id}&offerId=${offerId}&productIds=${products
              .map((product) => product.id)
              .join(",")}`}
          >
            Payer
          </Button>
        </div>
      )}
      {type === "newOffer" && // is a new offer and
        !isOfferOwner && ( // user is not the offer owner
          <OfferResponseButtons offerId={offerId} totalPrice={totalPrice} />
        )}
      {type === "orderDeliveredConfirmationRequired" && order && (
        <div>
          <p className="font-raleway">Si la commande correspond à la description confirmez la réception. Vous pouvez ouvrir un litige avant le {moment(order.automaticConfirmationDate).format('DD/MM/YYYY HH:mm')}, si la commande n'est pas arrivée ou ne correspond pas à sa description.</p>
          <div className="flex justify-between	items-center">
            <Button variant={"green"} onClick={handleConfirmOrderDelivered}>
              Confirmer la réception
            </Button>
            <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeCreateModal(true)} href=''>
              Ouvrir un litige
            </Link>
          </div>
        </div>        
      )}
      {type === "newDispute" && dispute && (
        <div className="flex justify-between	items-center">
          {
            userRole === 'seller' && !dispute.sellerDecision && !dispute.sentToHorseted
              ? <p className="font-raleway">Vous avez 72h pour répondre avant le {moment(dispute.createdAt).add(72, 'hour').format('DD/MM/YYYY HH:mm')}</p>
                : userRole === 'buyer' && !dispute.sellerDecision && moment().diff(dispute.createdAt, 'seconds') > 72 && !dispute.sentToHorseted
                  ? <Button variant={"green"} onClick={handleSendToHorseted}>
                      Envoyer à Horseted
                    </Button>                    
                  : <div/>
          }
          <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeModal(true)} href=''>
            Voir le litige
          </Link>
        </div>
      )}
      { type === "sellerDisputeDecisionRefund" && dispute && (
          userRole === "seller"
            ? <p className="font-raleway">Vous avez remboursé l'article</p>
            : <div className="flex justify-between	items-center">
                <p className="font-raleway">{ refundAmount
                    ? `Votre remboursement de ${formatPrice(refundAmount/100)}€ est en route`
                    : 'Votre remboursement est en route'
                  }</p>
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
      { type === "sellerDisputeDecisionReturnAtSellerCharge" && dispute?.returnParcelId && (
        userRole === 'buyer'
          ? <div className="flex justify-between	items-center">
              <p className="font-raleway">Vous avez 72h pour retourner le colis avant {moment(message.createdAt).add(72, 'hours').format('DD/MM/YYYY HH:mm')}</p>
              <Button onClick={() => downloadDisputeLabel(accessToken, dispute.id)}>
                Imprimer l'étiquette
              </Button>          
            </div>
          : <div className="flex justify-between	items-center">
              <p className="font-raleway">{recipient.username} va vous renvoyer le retour</p>
              { !dispute.returnSentAt && moment().diff(dispute.sellerDecidedAt, 'seconds') > 72 &&                
                <Button variant={"green"} onClick={handleSendToHorseted}>
                  Envoyer à Horseted
                </Button>                    
              }
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
      { type === "horsetedDisputeDecitionRefundBuyer" &&  userRole === 'seller' && (
        <p className="font-raleway">
          Horseted a remboursé l'acheteur     
        </p>
      )}      
      { type === "horsetedDisputeDecitionRefundSeller" &&  userRole === 'buyer' && (
        <p className="font-raleway">
          Horseted a remboursé le vendeur
        </p>
      )}      
      {( (type === "disputeDecisionReturnPaid" || type === "horsetedDisputeDecisionReturnAtHorsetedCharge")) && dispute?.returnParcelId && userRole === 'buyer' && (
        <div className="flex justify-between	items-center">
          <Button onClick={() => downloadDisputeLabel(accessToken, dispute.id)}>
            Imprimer l'étiquette
          </Button>
          <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeModal(true)} href=''>
            Voir le litige
          </Link>
        </div>
      )}
      { type === "sellerDisputeDecisionReturnAtBuyerChargeDeclined" &&
        <div className="flex justify-between	items-center">
            <p className="font-raleway">
              Horseted va traiter le litige
            </p>
            <Link className="text-dark-green text-xs underline" onClick={() => setIsDisputeModal(true)} href=''>
              Voir le litige
            </Link>
        </div>
      }
      { type === "disputeSentToHorseted" &&
        <p className="font-raleway">Le litige a été envoyé à Horseted</p>        
      }
      { type === "orderReturnDelivered" && userRole === "seller" && dispute?.returnDeliveredAt &&
        <p className="font-raleway">Vous avez 72h pour confirmer la réception avant le {moment(dispute.returnDeliveredAt).add(72, 'hours').format("DD/MM/YYYY HH:mm")}</p>
      }
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
      { type === "orderReturnDeliveryConfirmed" && userRole === "buyer" &&
        <p className="font-raleway">Vous le recevrez sur votre compte bancaire sous 6 jours ouvrés</p>
      }
      { type === "newOrderReturnDispute" &&
        <p className="font-raleway">Horseted va traiter le litige</p>
      }
      {
        type === "parcelAtServicePoint" && (
          userRole === "seller"
            ? <p className="font-raleway">Le colis est arrivé en point retrait et attend que {recipient.username} le récupère</p>
            : <p className="font-raleway">Vous disposez de 5 jours ouvrés pour récupérer votre colis au point de retrait.</p>
        )
      }
      {
        type === "parcelReturned" && (
          userRole === "seller"
            ? <p className="font-raleway">Le colis va vous être retourné</p>
            : <p className="font-raleway">Le délai de retrait du colis est dépassé. Le colis va être renvoyé au vendeur et vous recevrez un remboursement du montant de l'article {formatPrice(order.transferAmount)}</p>
        )
      }
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
