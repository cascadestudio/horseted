"use client";
import getImage from "@/utils/getImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import Link from "next/link";
import favoriteCountIcon from "@/assets/icons/favoriteCountIcon.png";
import { useEffect, useState } from "react";

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
      <ProductImage product={product} />
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

function ProductImage({ product }) {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getImage(product.medias[0].files.default, "client");
        setImageSrc(image);
      } catch (error) {}
    };

    fetchImage();
  }, []);

  if (product.hasOwnProperty("medias")) {
    return (
      <img
        className="aspect-[280/340] object-cover w-[280px]"
        src={imageSrc}
        alt="Image du produit"
      />
    );
  } else {
    return (
      <Image
        className="aspect-[280/340] object-cover w-[280px]"
        src={placeholderImage}
        alt="Image du produit"
        priority
      />
    );
  }
}
