import ProductImagesCarousel from "./ProductImagesCarousel";
import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.svg";
import getImage from "@/utils/getImage";

export default async function ProductMediaSection({ medias }) {
  const getMedias = async (medias) => {
    if (!medias) return;
    return await Promise.all(
      medias.map(async (media) => {
        const base64 = await getImage(media.files.thumbnail1000, "server");
        return {
          ...media,
          base64,
        };
      })
    );
  };

  const base64Medias = await getMedias(medias);

  return (
    <div className="w-full lg:w-3/5">
      {medias ? (
        <ProductImagesCarousel medias={base64Medias} />
      ) : (
        <div className="flex justify-center items-center w-full h-[calc(100vh_-_var(--header-height)-100px)]">
          <Image
            className="aspect-[280/340] max-h-full h-full w-full object-cover"
            src={placeholderImage}
            alt="Image du produit"
            priority
          />
        </div>
      )}
    </div>
  );
}
