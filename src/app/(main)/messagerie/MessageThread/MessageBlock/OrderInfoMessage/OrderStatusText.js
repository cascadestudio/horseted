import { centsToEuros } from "@/utils/centsToEuros";

export default function OrderStatusText({
  type,
  totalPrice,
  offerPrice,
  recipient,
  userRole,
}) {

  function getOrderMessageText(type) {
    const orderMessageText = {
      newOrder: "Nouvelle commande",
      orderSent: "Colis envoyé !",
      orderDelivered: "Colis livré !",
      orderDeliveredConfirmationRequired: "Confirmation de livraison requise !",
      offerAccepted: "Offre acceptée !",
      offerRejected: "Offre déclinée",
      addReview: "Ajouter une évaluation",

      newDispute: "Un litige a été ouvert",
      sellerDisputeDecisionRefund:
        userRole === "seller" ? `Vous avez remboursé ${recipient.username}`
                              : `${recipient.username} vous rembourse sans retour`,
      sellerDisputeDecisionReturnAtBuyerChargeApproved: `${recipient.username} a accepté de payer le retour`,
      sellerDisputeDecisionReturnAtBuyerChargeDeclined: 
        userRole == "seller" ? `${recipient.username} a refusé de payé le retour` 
                              : "Vous avez refusé de payé le retour",
      disputeDecisionReturnPaid: 'Confirmation de paiement du retour',
      horsetedDisputeDecitionRefund:
        userRole === "seller" ? `Horseted a remboursé ${recipient.username} sans retour`
                              : "Horseted vous rembourse sans retour",
      disputeSentToHorseted: 'Le litige a été envoyé à Horseted',
      horsetedDisputeDecisionReturnAtSellerCharge: "horsetedDisputeDecisionReturnAtSellerCharge",
      horsetedDisputeDecisionReturnAtBuyerCharge: "horsetedDisputeDecisionReturnAtBuyerCharge",
      horsetedDisputeDecisionReturnAtHorsetedCharge: 'horsetedDisputeDecisionReturnAtHorsetedCharge',
      orderReturnDeliveredConfirmationRequired: "Le colis a été livré",
      orderReturnDelivered: "Livraison à domicile effectuée",
      orderReturnSent: "Le colis a été retourné",
      newOrderReturnDispute: "Il y a un problème avec le retour de votre commande",
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
      ) : type === 'sellerDisputeDecisionReturnAtBuyerCharge' && userRole === 'seller'
          || type === 'sellerDisputeDecisionReturnAtSellerCharge' && userRole === 'buyer' ? (
        <span>Retour du colis aux frais de {recipient.username}</span>
      ) : type === 'sellerDisputeDecisionReturnAtBuyerCharge' && userRole === 'buyer'
          || type === 'sellerDisputeDecisionReturnAtSellerCharge' && userRole === 'seller' ? (
        <span>Retour du colis à vos frais</span>
      ) : (
        <span>{getOrderMessageText(type)}</span>
      )}
    </p>
  );
}
