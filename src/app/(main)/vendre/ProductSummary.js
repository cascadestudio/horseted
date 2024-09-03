import getImage from "@/utils/getImage";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductSummary({ postResponse }) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageSrcs, setImageSrcs] = useState([]);
  const { title, brand, size, medias } = postResponse;

  useEffect(() => {
    if (medias?.length) {
      medias.forEach(async (media) => {
        setIsImageLoading(true);
        await getMedia(media.files.thumbnail1000);
        setIsImageLoading(false);
      });
    }
  }, [medias]);

  async function getMedia(file) {
    const src = await getImage(file, "client");
    setImageSrcs((prev) => [...prev, src]);
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{brand}</p>
      <p>{size.value}</p>

      {imageSrcs.length > 0 &&
        imageSrcs.map((imageSrc, index) => (
          <Image
            key={index}
            src={imageSrc}
            className={`object-cover rounded`}
            width={100}
            height={100}
            alt="Avatar"
          />
        ))}
    </div>
  );
}
