import fetchHorseted from "@/utils/fetchHorseted";
import React, { useEffect, useState } from "react";
import DisplayMedia from "@/components/DisplayMedia";
import { useAuthContext } from "@/context/AuthContext";

import OrderInfoMessage from "./OrderInfoMessage";

export default function Message({ message, product, order, updateMessages }) {
  const { user, accessToken } = useAuthContext();
  const { id, content, senderId, type, offerId, medias } = message;
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  // console.log("message =>", message);

  useEffect(() => {
    if (order) {
      getProducts();
      // if (order.offers[0].id) {
      //   getOffer(order.offers[0].id);
      // }
    }
  }, []);

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

  const isFromUser = user.id === senderId;

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
      if (products.length === 0) break;
      return <OrderInfoMessage products={products} type={type} />;
    case "orderSent":
      if (products.length === 0) break;
      return <OrderInfoMessage products={products} type={type} />;
    case "orderDelivered":
      if (products.length === 0) break;
      return <OrderInfoMessage products={products} type={type} />;
    case "newOffer":
      if (products.length === 0) break;
      return (
        <OrderInfoMessage
          products={products}
          type={type}
          totalPrice={totalPrice}
        />
      );
    case "message":
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
