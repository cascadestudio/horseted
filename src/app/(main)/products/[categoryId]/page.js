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

  // Maybe make it global ?
  const fetchData = async (query) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeCategory}`;
        const data = await fetchData(query);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [activeCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `/products?orderBy=${orderBy}&category=${activeCategory}`;
        const data = await fetchData(query);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
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
