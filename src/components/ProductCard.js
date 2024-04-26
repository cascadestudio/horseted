import { getProductImage } from "@/libs/fetch";
import Image from "next/image";

export default async function ProductCard({ product }) {
  // console.log(product.medias[0].files.default);
  const blob = await getProductImage(
    `medias/${product.medias[0].files.default}`
  );
  // console.log(blob);

  const image = URL.createObjectURL(blob);
  // console.log(image);

  return (
    <>
      <h4>{product.title}</h4>
      Image
      <img src={image} alt="" />
      <Image src={image} width={100} height={100} />
    </>
  );
}
