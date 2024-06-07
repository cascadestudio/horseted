"use client";
// import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductsList from "./ProductList";

export default function ProductsPage({ params }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Filters states
  const [orderBy, setOrderBy] = useState(); //TODO quand Jojo l'a fait useState("visitCount;desc")
  const [activeCategory, setActiveCategory] = useState(params.categoryId);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/categories?parentId=${activeCategory}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      });
  }, [activeCategory]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/products?orderBy=${orderBy}&category=${activeCategory}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [orderBy, activeCategory]);

  function handleOrder(value) {
    setOrderBy(value);
  }
  function handleCategory(value) {
    setActiveCategory(value);
  }

  return (
    <div className="container mx-auto">
      <ProductFilters
        orderBy={orderBy}
        onOrderChange={handleOrder}
        activeCategory={activeCategory}
        onCategoryChange={handleCategory}
        categories={categories}
      />
      {!isLoading && <ProductsList products={products} />}
    </div>
  );
}
