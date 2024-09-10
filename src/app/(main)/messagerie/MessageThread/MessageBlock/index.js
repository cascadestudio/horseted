import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import DisplayMedia from "@/components/DisplayMedia";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";

import OrderInfoMessage from "./OrderInfoMessage";

export default function MessageBlock({ message }) {
  const { products, user, totalPrice } = useThreadsContext();
  const { content, senderId, type, offerId, medias } = message;

  // console.log("message =>", message);

  const isMessageFromRecipient = user.id === message.senderId;

  switch (type) {
    case "orderDeliveredConfirmationRequired":
      if (!products.length) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          isMessageFromRecipient={isMessageFromRecipient}
        />
      );
    case "orderSent":
      if (!products.length) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          isMessageFromRecipient={isMessageFromRecipient}
        />
      );
    case "orderDelivered":
      if (!products.length) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          isMessageFromRecipient={isMessageFromRecipient}
        />
      );
    case "newOffer":
      if (!products.length) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          totalPrice={totalPrice}
          isMessageFromRecipient={isMessageFromRecipient}
        />
      );
    case "message":
      return (
        <li
          className={`message-container ${
            isMessageFromRecipient ? "self-end" : "self-start"
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
