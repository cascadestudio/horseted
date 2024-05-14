import { getApi } from "@/libs/fetch";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";

export default async function RecentProductsSection({ title }) {
  const products = await getApi("products?category=206");

  return (
    <section className="mt-12 pb-32 bg-light-grey">
      <h3 className="font-bold text-[32px] mb-4">{title}</h3>
      <div className="container mx-auto px-5">
        <Carousel>
          {products.items.map((product, index) => {
            return (
              <div
                className={`block ${index >= 4 ? "hidden md:block" : ""} ${
                  index >= 16 ? "hidden lg:block" : ""
                }`}
                key={product}
              >
                <ProductCard className="mr-5" product={product} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
