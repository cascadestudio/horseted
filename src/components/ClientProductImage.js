import { useEffect, useState } from "react";
import getImage from "@/utils/getImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";

export default function ClientProductImage({ product, className, size }) {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        let image = null;
        if (size === "small") {
          image = await getImage(
            product.medias[0].files.thumbnail200,
            "client"
          );
        } else if (size === "large") {
          image = await getImage(
            product.medias[0].files.thumbnail1000,
            "client"
          );
        } else {
          image = await getImage(product.medias[0].files.default, "client");
        }
        setImageSrc(image);
      } catch (error) {}
    };

    fetchImage();
  }, []);

  if (product.hasOwnProperty("medias")) {
    return (
      <img
        className={`aspect-[280/340] object-cover rounded-md ${className}`}
        src={imageSrc}
        alt="Image du produit"
      />
    );
  } else {
    return (
      <Image
        className={`aspect-[280/340] object-cover rounded-md ${className}`}
        src={placeholderImage}
        alt="Image du produit"
        priority
      />
    );
  }
}
