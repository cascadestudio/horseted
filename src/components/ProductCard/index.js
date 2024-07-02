"use client";

import Image from "next/image";
import Link from "next/link";
import favoriteCountIcon from "@/assets/icons/favoriteCountIcon.png";
import ClientProductImage from "../ClientProductImage";

export default function ProductCard({ product, className }) {
  const { title, price, favoritCount, shipping } = product;
  const shippingSizeTranslations = {
    small: "Petit",
    medium: "Moyen",
    large: "Grand",
    very_large: "Très grand",
  };
  const shippingSizeFrench = shippingSizeTranslations[shipping];
  return (
    <Link
      href={`/product/${product.id}`}
      className={
        className + " block border-b border-grey mb-8 focus:outline-none"
      }
    >
      <ClientProductImage product={product} />
      <div className="flex p-5 justify-between">
        <div className="max-w-[82%]">
          <p className="font-poppins font-bold">{price} €</p>
          <h4 className="text-lg font-extrabold text-light-green truncate">
            {title}
          </h4>
          <p className="text-grey">{shippingSizeFrench}</p>
        </div>
        <div className="flex items-start">
          <Image
            src={favoriteCountIcon}
            alt="favoriteCountIcon"
            className="w-5 mr-1"
          />
          <p className="leading-none">{favoritCount}</p>
        </div>
      </div>
    </Link>
  );
}
