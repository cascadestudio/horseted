"use client";
import { fetchData } from "@/libs/fetch";
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
      className={className + " block border-b border-grey mb-8"}
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
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const query = `/medias/${product.medias[0].files.default}`;
        const data = await fetchData(query);
        setImage(`data:image/png;base64, ${data}`);
      } catch (error) {
        // It'ok to not have an image
      }
    };

    fetchImage();
  }, []);

  if (product.hasOwnProperty("medias")) {
    return (
      <img
        className="aspect-[280/340] object-cover w-[280px]"
        src={image}
        alt="Image du produit"
      />
    );
  } else {
    return (
      <Image
        className="aspect-[280/340] object-cover w-[280px]"
        src={placeholderImage}
        alt="Image du produit"
      />
    );
  }
}
