import { getApi } from "@/libs/fetch";
import ProductSection from "./ProductSection";
import ProductImage from "./ProductImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";

export default async function ProductPage({ params }) {
  const product = await getApi(`products/${params.id}`);
  // console.log("product =>", product);
  const { medias } = product;
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
      <ProductSection product={product} />
    </>
  );
}
