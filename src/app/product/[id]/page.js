import { getApi } from "@/libs/fetch";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import ProductImage from "./ProductImage";
import Button from "@/components/Button";
export default async function ProductPage({ params }) {
  const product = await getApi(`products/${params.id}`);
  // console.log("product =>", product);
  const {
    title,
    price,
    userId,
    description,
    status,
    createdAt,
    shipping,
    brand,
    material,
    favoritCount,
    color,
    category,
    medias,
    state,
  } = product;
  return (
    <div>
      {product.hasOwnProperty("medias") ? (
        medias.map((media) => {
          return (
            <div key={media.id}>
              <ProductImage media={media} />
            </div>
          );
        })
      ) : (
        <Image
          className="aspect-[280/340] object-cover w-20"
          src={placeholderImage}
          alt="Image du produit"
        />
      )}
      <h1>{title}</h1>
      <p>{price} €</p>
      <BuyButton />
    </div>
  );
}

function BuyButton() {
  return <Button href="/checkout">Acheter</Button>;
}
