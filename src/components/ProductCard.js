import { getProductImage } from "@/libs/fetch";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import Link from "next/link";

export default async function ProductCard({ product, className }) {
  console.log(product);
  const { title, price, favoritCount, size } = product;
  return (
    <Link href={`/products/${product.id}`} className={className + " block"}>
      <ProductImage product={product} />
      <p>{price} €</p>
      <p>{favoritCount}</p>
      <h4>{title}</h4>
      <p>{size?.value}</p>
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
        className="aspect-[280/340] object-cover"
        src={`data:image/png;base64, ${base64}`}
        alt="Image du produit"
      />
    );
  } else {
    return (
      <Image
        className="aspect-[280/340] object-cover"
        src={placeholderImage}
        alt="Image du produit"
      />
    );
  }
}
