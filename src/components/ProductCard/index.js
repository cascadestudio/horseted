"use client";

import Image from "next/image";
import Link from "next/link";
import favoriteCountIcon from "@/assets/icons/favoriteCountIcon.png";
import ClientProductImage from "../ClientProductImage";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

export default function ProductCard({
  productId,
  product: initialProduct,
  className,
}) {
  const { accessToken } = useAuthContext();
  const [product, setProduct] = useState(initialProduct);
  const shippingSizeTranslations = {
    small: "Petit",
    medium: "Moyen",
    large: "Grand",
    very_large: "Très grand",
  };

  useEffect(() => {
    if (productId && !initialProduct) {
      getProduct(productId);
    }
  }, [productId, initialProduct]);

  async function getProduct(productId) {
    const query = `/products/${productId}`;
    const data = await fetchHorseted(query);
    setProduct(data);
    console.log("data =>", data);
  }

  async function handleFavoriteClick() {
    const body = { productId: id };
    const query = "/users/me/favorits";
    const data = await fetchHorseted(query, accessToken, "POST", body, true);
    console.log("data =>", data);
  }

  if (!product) {
    return <Spinner />;
  }

  const { title, price, favoritCount, shipping, id } = product;
  const shippingSizeFrench = shippingSizeTranslations[shipping];

  return (
    <Link
      href={`/product/${product.id}`}
      className={
        className +
        " flex flex-col items-center border-b border-grey focus:outline-none"
      }
    >
      <ClientProductImage product={product} className="w-[280px] h-[340px]" />
      <div className="flex  w-full p-5 justify-between self-start">
        <div className="max-w-[82%]">
          <p className="font-poppins font-bold">{price} €</p>
          <h4 className="text-lg font-extrabold text-light-green truncate">
            {title}
          </h4>
          <p className="text-grey">{shippingSizeFrench}</p>
        </div>
        <div className="flex items-start">
          <button
            onClick={() => {
              handleFavoriteClick();
            }}
          >
            <Image
              src={favoriteCountIcon}
              alt="favoriteCountIcon"
              className="w-5 mr-1"
            />
          </button>
          <p className="leading-none">{favoritCount}</p>
        </div>
      </div>
    </Link>
  );
}
