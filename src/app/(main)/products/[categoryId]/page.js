"use client";
import ProductCard from "@/components/ProductCard";
// import { getApi } from "@/libs/fetch";
import { useState, useEffect } from "react";

export default function ProductsPage({ params }) {
  // const products = await getApi(`products?category=${params.categoryId}`);

  const [sortOption, setSortOption] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/products?category=${params.categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setIsLoading(false);
      });
  }, [sortOption]);

  return (
    <>
      <h1>{params.categoryId}</h1>
      <div className="p-5">
        <label htmlFor="sort">Trier par</label>
        <select name="sort" id="sort">
          <option value="">Nouveautés</option>
          <option value="">Populaires</option>
          <option value="">Prix croissant</option>
          <option value="">Prix décroissant</option>
        </select>
      </div>

      {!isLoading &&
        products.items.map((product) => {
          return (
            <div key={product.id}>
              {product.title}
              {/* TODO product card in client component */}
              {/* <ProductCard className="mr-5" product={product} />; */}
            </div>
          );
        })}
    </>
  );
}
