import { useState, useEffect } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";

import ProductsList from "./ProductList";
import ActiveFilterBtn from "./ActiveFilterBtn";
import SortSelect from "./ProductFilters/SortSelect";
import StateSelect from "./ProductFilters/StateSelect";
import BrandsSelect from "./ProductFilters/BrandsSelect";
import CategorySelect from "./ProductFilters/CategorySelect";
import PricesSelect from "./ProductFilters/PricesSelect";
import SizesSelect from "./ProductFilters/SizesSelect";
import MaterialsSelect from "./ProductFilters/MaterialsSelect";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryIdQuery = searchParams.get("categoryId");
  const categoryNameQuery = searchParams.get("categoryName");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters states
  const [activeOrder, setActiveOrder] = useState("createdAt;desc"); //TODO quand Jojo l'a fait useState("visitCount;desc")
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeState, setActiveState] = useState("");
  const [activeBrands, setActiveBrands] = useState([]);
  const [activeMaterials, setActiveMaterials] = useState([]);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activePrices, setActivePrices] = useState("");

  function resetFilters() {
    setActiveOrder("");
    setActiveCategory(null);
    setActiveState("");
    setActiveBrands([]);
    setActiveMaterials([]);
    setActiveSizes([]);
    setActivePrices("");
  }

  useEffect(() => {
    if (categoryIdQuery !== null && categoryNameQuery !== null) {
      setActiveCategory({
        id: categoryIdQuery,
        name: categoryNameQuery,
      });
    }
  }, [categoryNameQuery, categoryIdQuery]);

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
          const activeSizeIds = activeSizes.map((size) => size.id);
          query += `&sizes=${activeSizeIds.join(";")}`;
        }
        if (searchQuery !== null) {
          query += `&terms=${searchQuery}`;
        }
        const data = await fetchHorseted(query);
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
    searchQuery,
  ]);

  function handleOrderChange(e) {
    setActiveOrder(e.target.value);
  }
  function handleCategoryChange(id, name) {
    setActiveCategory({ id: id, name: name });
  }
  function handleStateChange(e) {
    setActiveState(e.target.value);
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
  function removeSearchTermFilter() {
    router.push("/articles");
  }
  function removeBrandFilter(brand) {
    setActiveBrands(activeBrands.filter((b) => b !== brand));
  }
  function removeMaterialFilter(material) {
    setActiveMaterials(activeMaterials.filter((m) => m !== material));
  }
  function removeSizeFilter(size) {
    setActiveSizes(activeSizes.filter((s) => s.name !== size));
  }

  const breadcrumbs = [{ label: "Accueil", href: "/" }, { label: "Catalogue" }];

  return (
    <div className="container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-4xl font-bold font-mcqueen mb-7">
        Tous les articles
      </h1>
      <legend className="font-semibold text-ms uppercase tracking-widest mb-4">
        Filtres :
      </legend>
      <div className="flex">
        <SortSelect
          onOrderChange={handleOrderChange}
          activeOrder={activeOrder}
        />
        <StateSelect
          activeState={activeState}
          onStateChange={handleStateChange}
        />
        <CategorySelect onClickProductCategory={handleCategoryChange} />
        <BrandsSelect
          activeBrands={activeBrands}
          onBrandsChange={handleBrandsChange}
        />
        <PricesSelect
          activePrices={activePrices}
          onPricesChange={handlePricesChange}
        />
        <MaterialsSelect
          activeMaterials={activeMaterials}
          onMaterialsChange={handleMaterialsChange}
        />
        {activeCategory !== null && (
          <SizesSelect
            activeSizes={activeSizes}
            onSizesChange={handleSizesChange}
            categoryId={activeCategory.id}
          />
        )}
      </div>
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
        {searchQuery !== null && (
          <ActiveFilterBtn
            filterName={searchQuery}
            onRemoveFilter={removeSearchTermFilter}
          />
        )}
        {activeBrands.length > 0 &&
          activeBrands.map((brand) => {
            return (
              <ActiveFilterBtn
                key={brand}
                filterName={brand}
                onRemoveFilter={removeBrandFilter}
              />
            );
          })}
        {activeMaterials.length > 0 &&
          activeMaterials.map((material) => {
            return (
              <ActiveFilterBtn
                key={material}
                filterName={material}
                onRemoveFilter={removeMaterialFilter}
              />
            );
          })}
        {activeSizes.length > 0 &&
          activeSizes.map((size) => {
            return (
              <ActiveFilterBtn
                key={size.id}
                filterName={size.name}
                onRemoveFilter={removeSizeFilter}
              />
            );
          })}
        <button
          className="bg-white text-gray-700 rounded-lg px-4 py-2 mt-4 hover:bg-gray-100"
          onClick={() => resetFilters()}
        >
          Effacer les filtres
        </button>
      </div>
      {!isLoading && <ProductsList products={products} />}
    </div>
  );
}
