import { useEffect, useState } from "react";
import getImage from "@/utils/getImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import Spinner from "@/components/Spinner";

export default function ClientProductImage({ product, className, size, style }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!product?.medias?.length) {
        setIsPlaceholder(true);
        setIsLoading(false);
        return;
      }

      try {
        let image;
        switch (size) {
          case "small":
            image = await getImage(
              product.medias[0].files.thumbnail200,
              "client"
            );
            break;
          case "large":
            image = await getImage(
              product.medias[0].files.thumbnail1000,
              "client"
            );
            break;
          default:
            image = await getImage(product.medias[0].files.default, "client");
            break;
        }
        setImageSrc(image);
      } catch (error) {
        console.error(error);
        setIsPlaceholder(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [product, size]);

  if (isLoading || isPlaceholder) {
    return (
      <Image
        className={`aspect-[280/340] object-cover rounded-md ${className}`}
        src={placeholderImage}
        alt={product.title}
        style={style}
        priority
      />
    );
  } else {
    return (
      <img
        className={`aspect-[280/340] object-cover rounded-md ${className}`}
        src={imageSrc}
        alt={product.title}
        title="Voir le produit"
        style={style}
      />
    );
  }
}
