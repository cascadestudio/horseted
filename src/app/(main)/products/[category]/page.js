import { getApi } from "@/libs/fetch";

export default async function ProductsPage({ params }) {
  const category = params.category;
  const products = await getApi(`products?category=${category}`);

  console.log(products);

  return (
    <>
      <h1>{category}</h1>
      {products.items.map((product) => {
        return <h1>{product.title}</h1>;
      })}
    </>
  );
}
