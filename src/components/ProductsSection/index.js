import { fetchData } from "@/libs/fetch";
import ProductCard from "@/components/ProductCard";
import ProductsCarousel from "@/components/ProductsCarousel";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

export default async function ProductsSection({ title }) {
  const products = await fetchData("/products?category=206");
  const fullConfig = resolveConfig(tailwindConfig);
  return (
    <section className="pb-14 lg:pb-24 bg-light-grey">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between flex-nowrap mb-4 lg:mb-5">
          <h3 className="font-mcqueen font-bold text-[20px] whitespace-nowrap lg:text-[32px]">
            {title}
          </h3>
          <Button
            href="/products"
            variant={"transparent"}
            className="border-none px-0 font-bold whitespace-nowrap pr-0 lg:border-solid lg:px-5"
          >
            Voir tout
            <RightArrow
              color={fullConfig.theme.colors["light-green"]}
              className="ml-2"
            />
          </Button>
        </div>
        <ProductsCarousel>
          {products.items.map((product, index) => {
            return (
              <div
                className={`block ${index >= 4 ? "hidden md:block" : ""} ${
                  index >= 16 ? "hidden lg:block" : ""
                }`}
                key={product.id}
              >
                <ProductCard className="mr-5" product={product} />
              </div>
            );
          })}
        </ProductsCarousel>
      </div>
    </section>
  );
}
