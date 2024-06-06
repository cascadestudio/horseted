"use client";
// import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

export default function ProductsPage({ params }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("new");
  const [categoryOption, setCategoryOption] = useState(params.categoryId);
  const [categories, setCategories] = useState([]);
  const [categoryParentId, setCategoryParentId] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/categories?parentId=${categoryParentId}`,
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
        setCategories(data);
      });
  }, [categoryParentId]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/products?orderBy=${sortOption}&category=${categoryOption}`;
    // console.log(url);
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
        setIsLoading(false);
      });
  }, [sortOption, categoryOption]);

  return (
    <>
      <h1>{params.categoryId}</h1>
      <div className="p-5">
        <label htmlFor="sort">Trier par</label>
        <select
          id="sort"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="new">Nouveautés</option>
          <option value="popular">Populaires</option>
          <option value="ascendingPrice">Prix croissant</option>
          <option value="">Prix décroissant</option>
        </select>
        <label htmlFor="category">Catégorie</label>
        <select
          id="category"
          onChange={(e) => setCategoryOption(e.target.value)}
          value={categoryOption}
        >
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
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
