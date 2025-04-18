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
  refreshFavoritPage,
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
      <ClientProductImage
        product={product}
        className="w-[280px] max-h-[340px] border-[1px] border-solid"
        style={{borderColor: '#CCCCCC'}}
      />     

      <div className="flex w-full p-5 justify-between self-start">
        <div className="max-w-[82%]">
          <p className="font-poppins font-bold">{centsToEuros(price)} €</p>
          <Link
            href={`/articles/${id}`}
            className="block text-lg font-extrabold text-light-green truncate capitalize"
          >
            {title}
            <span className="absolute inset-0"></span>
          </Link>
          <p className="text-grey">{shippingSizeFrench}</p>
        </div>
        <div className="flex items-start z-20">
          <FavoriteButton favoriteCount={favoritCount} product={product} />
        </div>
      </div>
    </div>
  );
}
