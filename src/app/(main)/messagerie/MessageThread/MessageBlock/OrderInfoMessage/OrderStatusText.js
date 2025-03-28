import { centsToEuros } from "@/utils/centsToEuros";
import { formatPrice } from "@/utils/formatNumber";
import moment from 'moment';

export default function OrderStatusText({
  type,
  totalPrice,
  offerPrice,
  recipient,
  userRole,
  order,
  parcel,
  dispute,
  orderRefundId
}) {

  function getOrderMessageText(type) {
    const refundAmount = dispute?.orderRefunds?.find(el => el.id == orderRefundId)?.amount ?? order?.transferAmount;
    
    const orderMessageText = {
      newOrder: "Nouvelle commande",
      orderSent: "Colis envoyé !",
      orderDelivered: userRole === "seller"
        ? "Commande livrée"
        : parcel?.servicePointName
          ? "Vous avez récupéré votre colis en point retrait"
          : "Livraison à domicile effectuée",
      orderDeliveredConfirmationRequired: order?.automaticConfirmationDate
        ? `Confirmation de livraison requise avant le ${moment(order.automaticConfirmationDate).format('DD/MM/YYYY HH:mm')}`
        : "Confirmation de livraison requise!",            
      offerAccepted: "Offre acceptée !",
      offerRejected: "Offre déclinée",
      addReview: "Ajouter une évaluation",

      newDispute:userRole === "buyer"
        ? "Vous avez ouvert un litige"
        : "Un litige a été ouvert",
      sellerDisputeDecisionRefund:
        userRole === "seller" ? `Litige clôturé`
                              : `${recipient.username} vous rembourse sans retour`,
      sellerDisputeDecisionReturnAtSellerCharge: userRole === 'buyer'
        ? `${recipient.username} accepte le retour de la commande à ses frais`
        : 'Vous avez payé le retour',
        sellerDisputeDecisionReturnAtBuyerCharge: userRole === 'buyer'
          ? `${recipient.username} accepte le retour de la commande à vos frais`
          : "Vous avez proposé un retour à la charge de l'acheteur",
      sellerDisputeDecisionReturnAtBuyerChargeApproved: `${recipient.username} a accepté de payer le retour`,
      sellerDisputeDecisionReturnAtBuyerChargeDeclined: 
        userRole == "seller" ? `${recipient.username} a refusé de payé le retour` 
                              : "Vous ne souhaitez pas payer le retour",
      disputeDecisionReturnPaid: 'Confirmation de paiement du retour',      
      horsetedDisputeDecitionRefundBuyer:
        userRole === "seller" ? "Litige cloturé"
                              : `Horseted va rembourser ${formatPrice(refundAmount/100)}€`,                              
      horsetedDisputeDecitionRefundSeller:
        userRole === "buyer" ? "Litige cloturé"
                              : `Horseted va rembourser ${formatPrice(refundAmount/100)}€`,
      disputeSentToHorseted: 'Le litige a été envoyé à Horseted',
      horsetedDisputeDecisionReturnAtSellerCharge:
        userRole === "seller" ? "Horseted propose un retour de la commande à vos frais"
                              : "Horseted propose un retour aux frais de l'acheteur",        
      horsetedDisputeDecisionReturnAtBuyerCharge: 
        userRole === "buyer" ? "Horseted propose un retour de la commande à vos frais"
                              : "Horseted propose un retour aux frais du vendeur",
      horsetedDisputeDecisionReturnAtHorsetedCharge: 'Horseted accepte le retour de la commande à ses frais',
      orderReturnDeliveredConfirmationRequired: "Le colis a été livré",
      orderReturnDelivered: userRole === 'seller'
        ? "Livraison à domicile effectuée"
        : `Le retour a été réceptionné par ${recipient.username}`,
      orderReturnDeliveryConfirmed: userRole === 'buyer'
        ? refundAmount
          ? `Votre remboursement de ${formatPrice(refundAmount/100)}€ est en route`
          : 'Votre remboursement est en route'
        : "Merci d'avoir validé le retour de l'article",
        orderDeliveryConfirmed: 'Commande terminée',
      orderReturnSent: "Le colis a été retourné",
      newOrderReturnDispute: userRole === 'seller'
        ? "Vous avez ouvert un litige sur le retour"
        : `${recipient.username} a ouvert un litige sur le retour`,
      parcelAtServicePoint: "Colis en point retrait",        
      parcelReturned: userRole === 'buyer'
        ? "Vous n'avez pas récupéré votre colis à temps"
        : `${recipient.username} n'a pas récupéré le colis`,
      newBuyerReview:
        userRole === "seller" ? "Ajouter une évaluation" : "Évaluation ajoutée !",
      newSellerReview:
        userRole === "buyer" ? "Ajouter une évaluation" : "Évaluation ajoutée !",      
    };

    return orderMessageText[type];
  }
  

  return (
    <p className="font-poppins font-medium mt-5 lg:mt-0 text-sm whitespace-nowrap">
      {type === "newOffer" && offerPrice ? (
        <>
          <span className="line-through">{centsToEuros(totalPrice)} €</span>
          {" > "}
          <span className="font-bold text-light-green">
            {centsToEuros(offerPrice)} €
          </span>
        </>
      ) : type === "offerDeclined" ? (
        <span className="text-red">Offre déclinée</span>
      ) : type === "offerAccepted" ? (
        <span className="text-dark-green">Offre acceptée</span>
      ) : recipient ? (
        <span>{getOrderMessageText(type)}</span>
      ) : <span></span> }
    </p>
  );
}
