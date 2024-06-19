"use client";
// import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductsList from "./ProductList";
import { fetchData } from "@/libs/fetch";
import ActiveFilterBtn from "./ActiveFilterBtn";

export default function ProductsPage({ params }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters states
  const [activeOrder, setActiveOrder] = useState(""); //TODO quand Jojo l'a fait useState("visitCount;desc")
  const [activeCategory, setActiveCategory] = useState({
    id: params.categoryId,
    name: params.categoryId,
  });
  const [activeState, setActiveState] = useState("");
  const [activeBrands, setActiveBrands] = useState([]);
  const [activeMaterials, setActiveMaterials] = useState([]);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activePrices, setActivePrices] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = `/products?orderBy=${activeOrder}`;
        if (activeCategory !== null) {
          query += `&category=${activeCategory.id}`;
        }
        if (activeState !== "") {
          query += `&states=${activeState}`;
        }
        if (activeBrands.length > 0) {
          query += `&brands=${activeBrands.join(";")}`;
        }
        if (activeMaterials.length > 0) {
          query += `&materials=${activeMaterials.join(";")}`;
        }
        if (activePrices !== "") {
          query += `&price=${activePrices}`;
        }
        if (activeSizes.length > 0) {
          query += `&sizes=${activeSizes.join(";")}`;
        }
        console.log("query =>", query);
        const data = await fetchData(query);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [
    activeOrder,
    activeCategory,
    activeState,
    activeBrands,
    activeMaterials,
    activePrices,
    activeSizes,
  ]);

  function handleOrderChange(value) {
    setActiveOrder(value);
  }
  function handleCategoryChange(id, name) {
    setActiveCategory({ id: id, name: name });
  }
  function handleStateChange(value) {
    setActiveState(value);
  }
  function handleBrandsChange(value) {
    setActiveBrands(value);
  }
  function handleMaterialsChange(value) {
    setActiveMaterials(value);
  }
  function handleSizesChange(value) {
    setActiveSizes(value);
  }
  function handlePricesChange(minPrice, maxPrice) {
    setActivePrices(`${minPrice}-${maxPrice}`);
  }
  function removeCategoryFilter() {
    setActiveCategory(null);
  }
  function removeStateFilter() {
    setActiveState("");
  }
  function removeBrandsFilter(brand) {
    setActiveBrands(activeBrands.filter((b) => b !== brand));
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
        onPricesChange={handlePricesChange}
        categoryId={activeCategory?.id}
      />
      <div className="p-5">
        {activeCategory !== null && (
          <ActiveFilterBtn
            filterName={activeCategory.name}
            onRemoveFilter={removeCategoryFilter}
          />
        )}
        {activeState !== "" && (
          <ActiveFilterBtn
            filterName={activeState}
            onRemoveFilter={removeStateFilter}
          />
        )}
        {activeBrands !== "" &&
          activeBrands.map((brand) => {
            return (
              <ActiveFilterBtn
                key={brand}
                filterName={brand}
                onRemoveFilter={removeBrandsFilter}
              />
            );
          })}
      </div>
      {!isLoading && <ProductsList products={products} />}
    </div>
  );
}
