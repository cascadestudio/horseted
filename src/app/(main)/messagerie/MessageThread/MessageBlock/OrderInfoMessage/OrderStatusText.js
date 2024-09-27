import { centsToEuros } from "@/utils/centsToEuros";

export default function OrderStatusText({ type, totalPrice, offerPrice }) {
  // console.log("offerPrice =>", offerPrice);

  const orderMessageText = {
    newOrder: "Nouvelle commande",
    orderSent: "Colis envoyé !",
    orderDelivered: "Colis livré !",
    orderDeliveredConfirmationRequired:
      "Colis en attente de livraison par le vendeur",
    offerAccepted: "Offre acceptée !",
    offerRejected: "Offre déclinée",
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
