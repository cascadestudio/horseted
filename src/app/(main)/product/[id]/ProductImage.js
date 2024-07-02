import getImage from "@/utils/getImage";

export default async function ProductImage({ media }) {
  const base64 = await getImage(media.files.default, "server");

  return (
    <img
      className="aspect-[280/340] object-cover h-full w-full"
      src={`data:image/png;base64, ${base64}`}
      alt="Image du produit"
    />
  );
}
