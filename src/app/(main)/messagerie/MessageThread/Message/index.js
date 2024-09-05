import fetchHorseted from "@/utils/fetchHorseted";
import React, { useEffect, useState } from "react";
import DisplayMedia from "@/components/DisplayMedia";
import { useAuthContext } from "@/context/AuthContext";

import OrderInfoMessage from "./OrderInfoMessage";

export default function Message({ message, order, updateMessages }) {
  const { user, accessToken } = useAuthContext();
  const { content, senderId, type, offerId, medias } = message;
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    if (order) {
      getProducts();
      // if (order.offers[0].id) {
      //   getOffer(order.offers[0].id);
      // }
    }
  }, [order]);

  const getProducts = async () => {
    const products = await Promise.all(
      order.items.map(
        async (item) => await fetchHorseted(`/products/${item.productId}`)
      )
    );

    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    setTotalPrice(totalPrice);
    setProducts(products);
  };

  // const getOffer = async (offerId) => {
  //   const offer = await fetchHorseted(`/offers/${offerId}`, accessToken);
  //   console.log("offer =>", offer);
  // };

  const isMessageFromRecipient = senderId === null;

  const handleOfferSellerResponse = async (status) => {
    const body = {
      status: status,
    };
    const response = await fetchHorseted(
      `/offers/${offerId}`,
      accessToken,
      "PATCH",
      body,
      true,
      true
    );
    console.log("response =>", response);
    updateMessages();
  };

  switch (type) {
    case "orderDeliveredConfirmationRequired":
      if (!products.length) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          order={order}
          isMessageFromRecipient={isMessageFromRecipient}
        />
      );
    case "orderSent":
      if (!products.length) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          order={order}
          isMessageFromRecipient={isMessageFromRecipient}
        />
      );
    case "orderDelivered":
      if (!products.length) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          order={order}
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
          order={order}
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
