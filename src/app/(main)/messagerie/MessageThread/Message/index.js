import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import DisplayMedia from "@/components/DisplayMedia";
import { useAuthContext } from "@/context/AuthContext";

import OrderInfoMessage from "./OrderInfoMessage";

export default function Message({ message, order }) {
  const { user } = useAuthContext();
  const { content, senderId, type, offerId, medias } = message;
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  // console.log("message =>", message);

  const isMessageFromRecipient = user.id === message.senderId;

  useEffect(() => {
    if (order) {
      getProducts();
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
