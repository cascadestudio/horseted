import { getApi } from "@/libs/fetch";
import ProductCard from "@/components/ProductCard";

export default async function RecentProductsSection({ title }) {
  const products = await getApi("products?category=206");

  return (
    <section className="mt-12">
      <h3 className="font-bold text-[32px] mb-4">{title}</h3>
      {products.items.slice(0, 3).map((product) => {
        return <ProductCard className="w-80" product={product} />;
      })}
    </section>
  );
}
