// import { useFetchProducts } from "@/libs/hooks";
// const [products] = useFetchProducts();

import { getProducts } from "@/libs/utils";

export default async function RecentProductsSection() {
  const products = await getProducts();

  return (
    <>
      <h3>Récemment ajouté</h3>
      {products.items.slice(0, 10).map((product) => {
        console.log(product.title);
        return <h4>{product.title}</h4>;
      })}
    </>
  );
}
