import Spinner from "@/components/Spinner";
import getImage from "@/utils/getImage";
import { postMedia } from "@/utils/postMedia";
import Image from "next/image";
import { useState } from "react";

export default function MediaInput({
  accessToken,
  setMessage,
  setImageSrcs,
  imageSrcs,
}) {
  const [isImageisLoading, setIsImageisLoading] = useState(false);

  const handleMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    const isFileLimit = imageSrcs.length + files.length > 10;
    if (isFileLimit) return alert("Vous avez dépassé la limite de 10 photos");
    if (files) {
      files.forEach(async (file) => {
        setIsImageisLoading(true);
        const media = await postMedia(file, accessToken);
        setMessage((prev) => ({ ...prev, medias: [...prev.medias, media.id] }));
        const src = await getImage(media.files.thumbnail200, "client");
        setImageSrcs((prev) => [...prev, src]);
        setIsImageisLoading(false);
      });
    }
  };

  return (
    <label className="flex justify-center items-center">
      {isImageisLoading ? (
        <Spinner />
      ) : (
        <>
          <input
            onChange={handleMediaChange}
            type="file"
            name="photos"
            className="hidden"
            accept="image/png, image/jpeg"
            multiple
            max={10}
          />
          <img className="mr-2" src="/icons/media-message.svg" alt="" />
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
        </>
      )}
    </label>
  );
}
