import { getProductImage } from "@/libs/fetch";
import Image from "next/image";
import RenderBlob from "./RenderBlob";

export default async function ProductCard({ product }) {
  const blob = await getProductImage(
    `medias/${product.medias[0].files.default}`
  );
  console.log("res => ", blob);
  // const image = URL.createObjectURL(blob);
  // console.log(image);
  return (
    <>
      <h4>{product.title}</h4>
      <img src={`data:image/png;base64, ${blob}`} alt="" />
      {/* <Image src={blob} width={100} height={100} /> */}
      {/* <RenderBlob blob={blob} /> */}
    </>
  );
}
