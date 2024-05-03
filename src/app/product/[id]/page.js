import { getApi } from "@/libs/fetch";
import OfferButton from "./OfferButton";
import ProductImage from "./ProductImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import Button from "@/components/Button";

export default async function ProductPage({ params }) {
  const product = await getApi(`products/${params.id}`);
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
    state,
    medias,
  } = product;
  return (
    <>
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
      <section>
        <h1>{title}</h1>
        <p>{price} €</p>
        <Button href="/checkout">Acheter</Button>
        <OfferButton />
      </section>
    </>
  );
}
