"use client";
// import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductsList from "./ProductList";
import { fetchData } from "@/libs/fetch";

export default function ProductsPage({ params }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters states
  const [activeOrder, setActiveOrder] = useState(""); //TODO quand Jojo l'a fait useState("visitCount;desc")
  const [activeCategory, setActiveCategory] = useState(params.categoryId);
  const [activeState, setActiveState] = useState("");
  const [activeBrands, setActiveBrands] = useState("");
  const [activeMaterials, setActiveMaterials] = useState("");
  const [activeSizes, setActiveSizes] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = `/products?orderBy=${activeOrder}`;
        if (activeCategory !== null) {
          query += `&category=${activeCategory}`;
        }
        if (activeState !== "") {
          query += `&states=${activeState}`;
        }
        if (activeBrands !== "") {
          query += `&brands=${activeBrands}`;
        }
        if (activeMaterials !== "") {
          query += `&materials=${activeMaterials}`;
        }
        console.log(query);
        const data = await fetchData(query);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeOrder, activeCategory, activeState, activeBrands, activeMaterials]);

  function handleOrderChange(value) {
    setActiveOrder(value);
  }
  function handleCategoryChange(value) {
    setActiveCategory(value);
  }
  function handleStateChange(value) {
    setActiveState(value);
  }
  function handleBrandsChange(value) {
    setActiveBrands(value.join(";"));
  }
  function handleMaterialsChange(value) {
    setActiveMaterials(value.join(";"));
  }
  function handleSizesChange(value) {
    setActiveSizes(value.join(";"));
  }

  return (
    <div className="container mx-auto">
      <ProductFilters
        activeOrder={activeOrder}
        onOrderChange={handleOrderChange}
        onCategoryChange={handleCategoryChange}
        onStateChange={handleStateChange}
        onBrandsChange={handleBrandsChange}
        onMaterialsChange={handleMaterialsChange}
        onSizesChange={handleSizesChange}
      />
      {/* TODO afficher les filtres sélectionné + possibilité de les enlever au clic */}
      {!isLoading && <ProductsList products={products} />}
    </div>
  );
}
