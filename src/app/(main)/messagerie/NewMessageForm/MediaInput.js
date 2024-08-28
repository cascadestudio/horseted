import Spinner from "@/components/Spinner";
import { postMedia } from "@/utils/postMedia";
import { useState } from "react";

export default function MediaInput() {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageSrcs, setImageSrcs] = useState([]);

  const handleMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    const isFileLimit = imageSrcs.length + files.length > 10;
    console.log("isFileLimit =>", isFileLimit);
    if (isFileLimit) return alert("Vous avez dépassé la limite de 10 photos");
    if (files) {
      files.forEach(async (file) => {
        setIsImageLoading(true);
        const media = await postMedia(file);
        console.log("media =>", media);
        setProduct((prev) => ({ ...prev, medias: [...prev.medias, media.id] }));
        await getMedia(media.files.thumbnail200);
        setIsImageLoading(false);
      });
    }
  };

  return (
    <label>
      {isImageLoading ? (
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
          <img src="/icons/media-message.svg" alt="" />
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
