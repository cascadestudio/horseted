import { getApi } from "@/libs/fetch";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";

export default async function RecentProductsSection({ title }) {
  const products = await getApi("products?category=206");

  return (
    <section className="mt-12">
      <h3 className="font-bold text-[32px] mb-4">{title}</h3>
      <Carousel>
        {products.items.map((product) => {
          return (
            <div key={product}>
              <ProductCard className="w-80" product={product} />;
            </div>
          );
        })}
      </Carousel>
    </section>
  );
}
