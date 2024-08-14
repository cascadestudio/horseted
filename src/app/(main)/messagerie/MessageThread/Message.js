import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

export default function Message({ message, userId, accessToken, product }) {
  const { id, content, senderId, type, offerId } = message;
  const [offerPrice, setOfferPrice] = useState(0);

  useEffect(() => {
    if (offerId) {
      getOffer();
    }
  }, [offerId]);

  const getOffer = async () => {
    const offer = await fetchHorseted(`/offers/${offerId}`, accessToken);
    setOfferPrice(offer.price);
  };

  switch (type) {
    case "newOffer":
      return (
        <li className="w-full h-40 border-y border-pale-grey flex">
          {/* TODO: Intégration du message de l'offre*/}
          {product.title}
          <p className="line-through">
            {product.price}€ {">"}
          </p>
          <p>{offerPrice}€</p>
        </li>
      );
    case "message":
      const isFromUser = userId === senderId;
      return (
        <li
          className={`message-container ${
            isFromUser ? "self-end" : "self-start"
          }`}
        >
          <p>{content}</p>
        </li>
      );
    default:
      return null;
  }
}
