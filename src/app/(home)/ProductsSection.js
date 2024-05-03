import { getApi } from "@/libs/fetch";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";

export default async function RecentProductsSection({ title }) {
  const products = await getApi("products?category=206");

  return (
    <section className="mt-12 pb-32 bg-light-grey">
      <h3 className="font-bold text-[32px] mb-4">{title}</h3>
      <Carousel>
        {products.items.slice(0, 25).map((product) => {
          return (
            <div className="pr-6" key={product}>
              <ProductCard className="w-80" product={product} />
            </div>
          );
        })}
      </Carousel>
    </section>
  );
}
