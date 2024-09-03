import fetchHorseted from "@/utils/fetchHorseted";
import React, { useEffect, useState } from "react";
import ClientProductImage from "@/components/ClientProductImage";
import DisplayMedia from "./DisplayMedia";
import { useAuthContext } from "@/context/AuthContext";
import Button from "@/components/Button";
import { centsToEuros } from "@/utils/centsToEuros";

export default function Message({ message, product, order, updateMessages }) {
  const { user, accessToken } = useAuthContext();
  const { id, content, senderId, type, offerId, medias } = message;
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  // console.log("product =>", product);

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
    case "orderSent":
      if (products.length === 0) break;
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
      if (products.length === 0) break;
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
        <>
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
              <span className="line-through">{centsToEuros(totalPrice)} €</span>
              {" > "}
              <span className="font-bold text-light-green">
                {centsToEuros(order.offers[0].price)} €
              </span>
            </p>
          </li>
          {!isFromUser && (
            <div className="flex">
              <Button
                variant={"red"}
                className="self-start p-3 mr-3"
                onClick={() => handleOfferSellerResponse("declined")}
              >
                Décliner l'offre
              </Button>
              <Button
                className="self-start p-3"
                onClick={() => handleOfferSellerResponse("approved")}
              >
                Accepter l'offre
              </Button>
            </div>
          )}
        </>
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
