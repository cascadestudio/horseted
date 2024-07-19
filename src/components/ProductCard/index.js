"use client";

import Image from "next/image";
import Link from "next/link";
import favoriteCountIcon from "@/assets/icons/favoriteCountIcon.png";
import ClientProductImage from "../ClientProductImage";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";

export default function ProductCard({ product, className }) {
  const { accessToken } = useAuthContext();
  const { title, price, favoritCount, shipping, id } = product;
  // productId if from favoriteProducts
  const shippingSizeTranslations = {
    small: "Petit",
    medium: "Moyen",
    large: "Grand",
    very_large: "Très grand",
  };
  const shippingSizeFrench = shippingSizeTranslations[shipping];

  async function handleFavoriteClick() {
    const body = { productId: id };
    const query = "/users/me/favorits";
    const data = await fetchHorseted(query, accessToken, "POST", body, true);
    console.log("data =>", data);
  }

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
