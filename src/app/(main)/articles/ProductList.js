import ProductCard from "@/components/ProductCard";

export default function ProductList({ products }) {
  return (
    <section className="grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full lg:gap-14 min-h-96">
      {products.items.map((product) => {
        return (
          <div key={product.id} className="">
            <ProductCard product={product} />
          </div>
        );
      })}
    </section>
  );
}
