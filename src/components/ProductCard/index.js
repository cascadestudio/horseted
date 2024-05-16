import { getProductImage } from "@/libs/fetch";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import Link from "next/link";
import favoriteCountIcon from "@/assets/icons/favoriteCountIcon.png";

export default async function ProductCard({ product, className }) {
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

async function ProductImage({ product }) {
  if (product.hasOwnProperty("medias")) {
    const base64 = await getProductImage(
      `medias/${product.medias[0].files.default}`
    );

    return (
      <img
        className="aspect-[280/340] object-cover w-[280px]"
        src={`data:image/png;base64, ${base64}`}
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
