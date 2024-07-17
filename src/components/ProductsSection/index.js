import fetchHorseted from "@/utils/fetchHorseted";
import ProductCard from "@/components/ProductCard";
import ProductsCarousel from "@/components/ProductsCarousel";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

export default async function ProductsSection({ title, orderBy, categoryId }) {
  let query = "/products";
  if (orderBy) query += `?orderBy=${orderBy}`;
  if (categoryId) query += `?category=${categoryId}`;

  const productsData = await fetchHorseted(query);
  const products = productsData.items.slice(0, 16);
  return (
    <section className="pb-14 lg:pb-24 bg-light-grey">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between flex-nowrap mb-4 lg:mb-5">
          <h3 className="font-mcqueen font-bold text-[20px] whitespace-nowrap lg:text-[32px]">
            {title}
          </h3>
          <Button
            href="/products"
            variant="transparent-green"
            className="border-none px-0 font-bold pr-0 lg:border-solid lg:px-5"
          >
            Voir tout
            <RightArrow className="ml-2" />
          </Button>
        </div>
        <ProductsCarousel>
          {products.map((product, index) => {
            return (
              <div
                className={`block ${index >= 4 ? "hidden md:block" : ""} ${
                  index >= 16 ? "hidden lg:block" : ""
                }`}
                key={product.id}
              >
                <ProductCard className="mb-8 mr-6 lg:mr-12" product={product} />
              </div>
            );
          })}
        </ProductsCarousel>
      </div>
    </section>
  );
}
