import getImage from "@/utils/getImage";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DisplayMedia({ medias }) {
  const [imageSrcs, setImageSrcs] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const srcs = await Promise.all(
      medias.map(async (media) => {
        return await getImage(media.files.thumbnail200, "client");
      })
    );
    setImageSrcs(srcs);
  }

  return (
    <div className="flex gap-2 mt-3">
      {imageSrcs.map((imageSrc, index) => (
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
