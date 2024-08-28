import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import ClientProductImage from "@/components/ClientProductImage";
import DisplayMedia from "./DisplayMedia";

export default function Message({ message, userId, accessToken, product }) {
  const { id, content, senderId, type, offerId, medias } = message;
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
    case "orderSent":
      if (!product) break;
      return (
        <li className="w-full h-[70px] border-y border-pale-grey flex items-center justify-between">
          <div className="flex items-center">
            <ClientProductImage
              key={product.id}
              product={product}
              size="small"
              className="w-24 h-14"
            />
            <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
              {product.title}
            </div>
          </div>
          <p className="font-poppins font-medium text-sm whitespace-nowrap">
            Colis envoyé !
          </p>
        </li>
      );
    case "orderDelivered":
      if (!product) break;
      return (
        <li className="w-full h-[70px] border-y border-pale-grey flex items-center justify-between">
          <div className="flex items-center">
            <ClientProductImage
              key={product.id}
              product={product}
              size="small"
              className="w-24 h-14"
            />
            <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
              {product.title}
            </div>
          </div>
          <p className="font-poppins font-medium text-sm whitespace-nowrap">
            Colis livré !
          </p>
        </li>
      );
    case "newOffer":
      if (!product) break;
      return (
        <li className="w-full h-[70px] border-y border-pale-grey flex items-center justify-between">
          <div className="flex items-center">
            <ClientProductImage
              key={product.id}
              product={product}
              size="small"
              className="w-24 h-14"
            />
            <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
              {product.title}
            </div>
          </div>
          <p className="font-poppins font-medium text-sm whitespace-nowrap">
            <span className="line-through">{product.price}€</span>
            {" > "}
            <span className="font-bold text-light-green">{offerPrice}€</span>
          </p>
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
          {medias?.length > 0 && <DisplayMedia medias={medias} />}
        </li>
      );
    default:
      return null;
  }
}
