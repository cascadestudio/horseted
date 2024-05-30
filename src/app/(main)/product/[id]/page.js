import { getApi } from "@/libs/fetch";
import OfferButton from "./OfferButton";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import Button from "@/components/Button";
import ProductImagesCarousel from "./ProductImagesCarousel";
import ProductImage from "./ProductImage";

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
        <ProductImagesCarousel>
          {medias.map((media) => {
            return (
              <div key={media.id}>
                <ProductImage media={media} />
              </div>
            );
          })}
        </ProductImagesCarousel>
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
