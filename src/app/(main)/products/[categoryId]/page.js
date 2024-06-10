"use client";
// import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductsList from "./ProductList";
import { fetchData } from "@/libs/fetch";

export default function ProductsPage({ params }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Filters states
  const [orderBy, setOrderBy] = useState(); //TODO quand Jojo l'a fait useState("visitCount;desc")
  const [activeCategory, setActiveCategory] = useState(params.categoryId);

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
        onClickProductCategory={handleCategory}
      />
      {!isLoading && <ProductsList products={products} />}
    </div>
  );
}
