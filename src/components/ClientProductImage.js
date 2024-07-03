import { useEffect, useState } from "react";
import getImage from "@/utils/getImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";

export default function ProductImage({ product, className }) {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getImage(product.medias[0].files.default, "client");
        setImageSrc(image);
      } catch (error) {}
    };

    fetchImage();
  }, []);

  if (product.hasOwnProperty("medias")) {
    return (
      <img
        className={`aspect-[280/340] object-cover ${className}`}
        src={imageSrc}
        alt="Image du produit"
      />
    );
  } else {
    return (
      <Image
        className={`aspect-[280/340] object-cover ${className}`}
        src={placeholderImage}
        alt="Image du produit"
        priority
      />
    );
  }
}
