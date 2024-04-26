import { getApi } from "@/libs/fetch";
import ProductCard from "@/components/ProductCard";

export default async function RecentProductsSection({ title }) {
  const products = await getApi("products?category=206");

  return (
    <>
      <h3 className="font-bold text-[32px]">{title}</h3>
      {products.items.slice(0, 1).map((product) => {
        return <ProductCard product={product} />;
      })}
    </>
  );
}
