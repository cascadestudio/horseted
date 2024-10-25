import { centsToEuros } from "@/utils/centsToEuros";

export default function OrderStatusText({
  type,
  totalPrice,
  offerPrice,
  userRole,
}) {
  const orderMessageText = {
    newOrder: "Nouvelle commande",
    orderSent: "Colis envoyé !",
    orderDelivered: "Colis livré !",
    orderDeliveredConfirmationRequired: "Confirmation de livraison requise !",
    offerAccepted: "Offre acceptée !",
    offerRejected: "Offre déclinée",
    addReview: "Ajouter une évaluation",
    newBuyerReview:
      userRole === "seller" ? "Ajouter une évaluation" : "Évaluation ajoutée",
    newSellerReview:
      userRole === "buyer" ? "Ajouter une évaluation" : "Évaluation ajoutée",
  };

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
      ) : (
        <span>{orderMessageText[type]}</span>
      )}
    </p>
  );
}
