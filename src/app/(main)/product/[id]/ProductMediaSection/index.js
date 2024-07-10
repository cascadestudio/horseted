import ProductImagesCarousel from "./ProductImagesCarousel";
import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.svg";

export default function ProductMediaSection({ product, medias }) {
  return (
    <div className="w-full lg:w-3/5">
      {product.hasOwnProperty("medias") ? (
        <ProductImagesCarousel product={product} medias={medias} />
      ) : (
        <div className="flex justify-center items-center w-full h-[calc(100vh_-_var(--header-height)-100px)]">
          <Image
            className="aspect-[280/340] max-h-full h-full w-full object-cover"
            src={placeholderImage}
            alt="Image du produit"
            priority
          />
        </div>
      )}
    </div>
  );
}
