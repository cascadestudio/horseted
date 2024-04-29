import { getProductImage } from "@/libs/fetch";
import RenderBlob from "./RenderBlob";

export default async function ProductCard({ product }) {
  // console.log(product.medias[0].files.default);
  const blob = await getProductImage(
    `medias/${product.medias[0].files.default}`
  );
  console.log("res => ", blob);

  const image = URL.createObjectURL(blob);
  // console.log(image);

  return (
    <>
      <h4>{product.title}</h4>
      <RenderBlob image={image} />
    </>
  );
}
