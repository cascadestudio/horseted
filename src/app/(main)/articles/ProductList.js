import ProductCard from "@/components/ProductCard";

export default function ProductList({ products }) {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
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
