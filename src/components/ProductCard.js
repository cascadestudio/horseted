import { getProductImage } from "@/libs/fetch";

export default async function ProductCard({ product }) {
  const base64 = await getProductImage(
    `medias/${product.medias[0].files.default}`
  );

  return (
    <>
      <h4>{product.title}</h4>
      <img src={`data:image/png;base64, ${base64}`} alt="Image du produit" />
    </>
  );
}
