import ProductCard from "@/components/ProductCard";

export default function ProductList({ products }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full gap-14 min-h-96">
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
