"use client";
// import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductsList from "./ProductList";

export default function ProductsPage({ params }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryParentId, setCategoryParentId] = useState(params.categoryId);

  const [orderBy, setOrderBy] = useState(); //TODO quand Jojo l'a fait useState("visitCount;desc")
  const [currentCategory, setCurrentCategory] = useState(params.categoryId);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/categories?parentId=${categoryParentId}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, [categoryParentId]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/products?orderBy=${orderBy}&category=${currentCategory}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setIsLoading(false);
      });
  }, [orderBy, currentCategory]);

  function handleOrder(value) {
    setOrderBy(value);
  }

  return (
    <>
      <ProductFilters
        orderBy={orderBy}
        onOrderChange={handleOrder}
        // onCategoryChange={setCurrentCategory(value)}
      />
      {!isLoading && <ProductsList products={products} />}
    </>
  );
}
