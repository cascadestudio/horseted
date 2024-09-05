import getImage from "@/utils/getImage";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DisplayMedia({ medias, productSummary }) {
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

  const maxImagesToShow = 3;
  const displayImages = productSummary
    ? imageSrcs.slice(0, maxImagesToShow)
    : imageSrcs;
  const remainingImagesCount = productSummary
    ? imageSrcs.length - maxImagesToShow
    : 0;

  return (
    <div
      className={`flex flex-col lg:flex-row ${productSummary ? "gap-5" : "gap-2 mt-3"}`}
    >
      {displayImages.map((imageSrc, index) => (
        <div
          key={index}
          className="relative"
          style={{
            width: productSummary ? "250px" : "100px",
            height: productSummary ? "290px" : "125px",
          }}
        >
          <Image
            src={imageSrc}
            className="object-cover rounded"
            layout="fill"
            alt="Avatar"
          />
        </div>
      ))}

      {productSummary && remainingImagesCount > 0 && (
        <div className="flex items-center justify-center font-mcqueen font-semibold text-[28px] ml-3">
          +{remainingImagesCount}
        </div>
      )}
    </div>
  );
}
