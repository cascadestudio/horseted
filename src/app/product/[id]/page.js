import { getApi } from "@/libs/fetch";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import { getProductImage } from "@/libs/fetch";

export default async function ProductPage({ params }) {
  const product = await getApi(`products/${params.id}`);
  const { title, price } = product;
  return (
    <div>
      {product.hasOwnProperty("medias") ? (
        product.medias?.map((media) => {
          return <ProductImage media={media} />;
        })
      ) : (
        <Image
          className="aspect-[280/340] object-cover w-20"
          src={placeholderImage}
          alt="Image du produit"
        />
      )}
      <h1>{title}</h1>
      {price} €
    </div>
  );
}

async function ProductImage({ media }) {
  const base64 = await getProductImage(`medias/${media.files.default}`);

  return (
    <img
      className="aspect-[280/340] object-cover w-20"
      src={`data:image/png;base64, ${base64}`}
      alt="Image du produit"
    />
  );
}
