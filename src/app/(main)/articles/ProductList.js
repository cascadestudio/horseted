import ProductCard from "@/components/ProductCard";

export default function ProductList({ products }) {
  return (
    <div>
      {products.items.map((product) => {
        return (
          <div key={product.id}>
            <ProductCard className="mr-5" product={product} />
            {/* TODO pagination */}
          </div>
        );
      })}
    </div>
  );
}
