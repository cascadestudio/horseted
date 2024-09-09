"use client";

import Link from "next/link";
import ClientProductImage from "@/components/ClientProductImage";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import FavoriteButton from "@/components/FavoriteButton";
import { shippingSizeTranslations } from "@/utils/translations";
import { centsToEuros } from "@/utils/centsToEuros";

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
      ${className} relative flex flex-col items-center border-b border-grey focus:outline-none"
    `}
    >
      <ClientProductImage product={product} className="w-[280px] h-[340px]" />
      <div className="flex w-full p-5 justify-between self-start">
        <div className="max-w-[82%]">
          <p className="font-poppins font-bold">{centsToEuros(price)} €</p>
          <Link href={`/product/${id}`} className="relative block">
            <h4 className="text-lg font-extrabold text-light-green truncate relative">
              {title}
            </h4>
          </Link>
          <p className="text-grey">{shippingSizeFrench}</p>
        </div>
        <div className="flex items-start">
          <FavoriteButton favoriteCount={favoritCount} productId={id} />
        </div>
      </div>
      <Link
        href={`/product/${id}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${title}`}
      />
    </div>
  );
}
