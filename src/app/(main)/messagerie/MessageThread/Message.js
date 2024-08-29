import fetchHorseted from "@/utils/fetchHorseted";
import React, { useEffect, useState } from "react";
import ClientProductImage from "@/components/ClientProductImage";
import DisplayMedia from "./DisplayMedia";

export default function Message({
  message,
  userId,
  // accessToken,
  product,
  order,
}) {
  // console.log("order =>", order);

  const { id, content, senderId, type, offerId, medias } = message;
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

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

  switch (type) {
    case "orderSent":
      if (!products) break;
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
      if (!products) break;
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
      if (products.length === 0) break;
      return (
        <li className="w-full h-[70px] border-y border-pale-grey flex items-center justify-between">
          {products.map((product) => (
            <div key={product.id} className="flex items-center">
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
          ))}
          <p className="font-poppins font-medium text-sm whitespace-nowrap">
            <span className="line-through">{totalPrice}€</span>
            {" > "}
            <span className="font-bold text-light-green">
              {order.offers[0].price}€
            </span>
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
