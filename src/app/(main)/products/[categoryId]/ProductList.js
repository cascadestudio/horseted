export default function ProductList({ products }) {
  return (
    <div>
      {products.items.map((product) => {
        return (
          <div key={product.id}>
            {product.title}
            {/* TODO product card in client component */}
            {/* <ProductCard className="mr-5" product={product} />; */}
          </div>
        );
      })}
    </div>
  );
}
