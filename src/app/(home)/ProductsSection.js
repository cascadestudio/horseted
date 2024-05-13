import { getApi } from "@/libs/fetch";
import ProductCard from "@/components/ProductCard";
import ProductsCarousel from "@/components/ProductsCarousel";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

export default async function ProductsSection({ title }) {
  const products = await getApi("products?category=206");
  const fullConfig = resolveConfig(tailwindConfig);
  return (
    <section className="pb-14 lg:pb-24 bg-light-grey">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between mb-4 lg:mb-5">
          <h3 className="font-mcqueen font-bold text-[20px] lg:text-[32px]">
            {title}
          </h3>
          <Button
            href="/products"
            variant={"transparent"}
            className="border-none px-0 font-bold lg:border-solid lg:px-5"
          >
            Voir tout{" "}
            <RightArrow
              color={fullConfig.theme.colors["light-green"]}
              className={"ml-2"}
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
                key={product}
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
