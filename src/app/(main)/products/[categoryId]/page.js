import ProductCard from "@/components/ProductCard";
import { getApi } from "@/libs/fetch";

export default async function ProductsPage({ params }) {
  const products = await getApi(`products?category=${params.categoryId}`);

  // console.log(products);

  return (
    <>
      <h1>{params.categoryId}</h1>

      {products.items.map((product) => {
        return <ProductCard className="mr-5" product={product} />;
      })}
    </>
  );
}
