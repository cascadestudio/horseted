import { fetchData } from "@/libs/fetch";

export default async function ProductImage({ media }) {
  const base64 = await fetchData(`/medias/${media.files.default}`);

  return (
    <img
      className="aspect-[280/340] object-cover h-full w-full"
      src={`data:image/png;base64, ${base64}`}
      alt="Image du produit"
    />
  );
}
