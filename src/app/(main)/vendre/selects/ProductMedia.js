import { useState } from "react";
import getImage from "@/utils/getImage";
import fetchHorseted from "@/utils/fetchHorseted";
import Image from "next/image";
import Spinner from "@/components/Spinner";

export default function ProductMedia({ accessToken, setProduct }) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageSrcs, setImageSrcs] = useState([]);

  // console.log("imageSrcs =>", imageSrcs);

  const handleMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    // console.log("files =>", files);
    if (files) {
      setIsImageLoading(true);
      files.forEach(async (file) => {
        const media = await postMedia(file);
        console.log("media =>", media);
        setProduct((prev) => ({ ...prev, medias: [...prev.medias, media.id] }));
        await getMedia(media.files.thumbnail200);
      });
      setIsImageLoading(false);
    }
  };

  async function postMedia(file) {
    const formdata = new FormData();
    formdata.append("media", file);
    const media = await fetchHorseted(
      `/medias`,
      accessToken,
      "POST",
      formdata,
      false,
      true
    );
    return media;
  }

  async function getMedia(file) {
    const src = await getImage(file, "client");
    // console.log("src =>", src);
    setImageSrcs((prev) => [...prev, src]);
  }

  return (
    <div className="w-full flex justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px]">Photos* :</h3>

      <label className="text-light-green flex flex-col items-center justify-center max-w-[700px] w-full border border-light-green border-dashed rounded-xl bg-white py-5 cursor-pointer min-h-[122px]">
        {isImageLoading ? (
          <Spinner />
        ) : (
          <>
            <span className="w-10 h-10 flex items-center justify-center bg-lighter-green border border-light-green rounded-full text-4xl text-light-green">
              +
            </span>
            <p className="font-bold font-mcqueen text-center">
              Ajouter des photos
            </p>
            <p className="font-medium text-sm text-black">
              Ajoutez jusqu’à 10 photos
            </p>
            <input
              onChange={handleMediaChange}
              type="file"
              name="photos"
              className="hidden"
              accept="image/png, image/jpeg"
              multiple
              max={10}
              required
            />
          </>
        )}
      </label>
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