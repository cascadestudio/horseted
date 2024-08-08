"use client";

import Link from "next/link";
import ClientProductImage from "@/components/ClientProductImage";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import FavoriteButton from "@/components/FavoriteButton";
import { shippingSizeTranslations } from "@/utils/translations";

export default function ProductCard({
  productId,
  product: initialProduct,
  className,
}) {
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    if (productId && !initialProduct) {
      getProduct(productId);
    }
  }, [productId, initialProduct]);

  async function getProduct(productId) {
    const query = `/products/${productId}`;
    const data = await fetchHorseted(query);
    setProduct(data);
  }

  if (!product) {
    return <Spinner />;
  }

  const { title, price, favoritCount, shipping, id } = product;
  const shippingSizeFrench = shippingSizeTranslations[shipping];

  return (
    <div
      className={`
      ${className} flex flex-col items-center border-b border-grey focus:outline-none"
    `}
    >
      <Link href={`/product/${id}`}>
        <ClientProductImage product={product} className="w-[280px] h-[340px]" />
      </Link>

      <div className="flex w-full p-5 justify-between self-start">
        <Link href={`/product/${id}`} className="max-w-[82%]">
          <p className="font-poppins font-bold">{price} €</p>
          <h4 className="text-lg font-extrabold text-light-green truncate">
            {title}
          </h4>
          <p className="text-grey">{shippingSizeFrench}</p>
        </Link>
        <div className="flex items-start">
          <FavoriteButton favoriteCount={favoritCount} productId={id} />
        </div>
      </div>
    </div>
  );
}
