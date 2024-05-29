"use client";
import ProductImage from "./ProductImage";
export default function ProductImagesCarousel({ medias }) {
  medias.map((media) => {
    return (
      <div key={media.id}>
        <ProductImage media={media} />
      </div>
    );
  });
}
