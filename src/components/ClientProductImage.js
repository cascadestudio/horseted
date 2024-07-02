import { useEffect, useState } from "react";
import getImage from "@/utils/getImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";

export default function ProductImage({ product }) {
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
        className="aspect-[280/340] object-cover w-[280px]"
        src={imageSrc}
        alt="Image du produit"
      />
    );
  } else {
    return (
      <Image
        className="aspect-[280/340] object-cover w-[280px]"
        src={placeholderImage}
        alt="Image du produit"
        priority
      />
    );
  }
}
