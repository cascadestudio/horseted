import fetchHorseted from "@/utils/fetchHorseted";
import ProductPageClient from "./ProductPageClient";

export default async function ProductPage({ params }) {
  const product = await fetchHorseted(`/products/${params.id}`);
  const userData = await fetchHorseted(`/users/${product.userId}`);
  const userProducts = await fetchHorseted(
    `/products?orderBy=createdAt;desc&fromId=${product.userId}`
  );

  return (
    <ProductPageClient
      product={product}
      userData={userData}
      userProducts={userProducts.items}
      params={params}
    />
  );
}
