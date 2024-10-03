"use client";

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
import TotalProduct from "./TotalProduct";
import Spinner from "@/components/Spinner";
import Pagination from "./Pagination";
import Button from "@/components/Button";
import FiltersModal from "./FiltersModal";
import { shippingSizeTranslations } from "@/utils/translations";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");
  const categoryIdParam = searchParams.get("categoryId");
  const categoryNameParam = searchParams.get("categoryName");
  const stateParam = searchParams.get("state");
  const colorParam = searchParams.get("color");
  const brandParam = searchParams.get("brand");
  const materialIdParam = searchParams.get("materialId");
  const sizeIdParam = searchParams.get("sizeId");
  const sizeNameParam = searchParams.get("sizeName");
  const shippingParam = searchParams.get("shipping");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters states
  const [activeOrder, setActiveOrder] = useState("visitCount;desc");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeState, setActiveState] = useState("");
  const [activeBrands, setActiveBrands] = useState([]);
  const [activeMaterials, setActiveMaterials] = useState([]);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activePrices, setActivePrices] = useState("");
  const [activeShipping, setActiveShipping] = useState("");
  const [fromId, setFromId] = useState(null);

  function resetFilters() {
    setActiveOrder("");
    setActiveCategory(null);
    setActiveState("");
    setActiveBrands([]);
    setActiveMaterials([]);
    setActiveSizes([]);
    setActivePrices("");
    setActiveShipping("");
  }

  useEffect(() => {
    if (categoryIdParam && categoryNameParam) {
      setActiveCategory({
        id: categoryIdParam,
        name: categoryNameParam,
      });
    }
    if (stateParam) {
      setActiveState(stateParam);
    }
    if (colorParam) {
      setActiveBrands([colorParam]);
    }
    if (brandParam) {
      setActiveBrands([brandParam]);
    }
    if (materialIdParam) {
      setActiveMaterials([materialIdParam]);
    }
    if (sizeNameParam && sizeIdParam) {
      setActiveSizes([{ id: sizeIdParam, value: sizeNameParam }]);
    }
    if (shippingParam) {
      setActiveShipping(shippingParam);
    }
  }, [
    categoryNameParam,
    categoryIdParam,
    stateParam,
    colorParam,
    brandParam,
    materialIdParam,
    sizeNameParam,
    sizeIdParam,
    shippingParam,
  ]);

  useEffect(() => {
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
    if (searchParam !== null) {
      query += `&terms=${searchParam}`;
    }
    if (fromId !== null) {
      query += `&fromId=${fromId}`;
    }
    if (activeShipping) {
      query += `&shippings=${activeShipping}`;
    }
    fetchProducts(query);
  }, [
    activeOrder,
    activeCategory,
    activeState,
    activeBrands,
    activeMaterials,
    activePrices,
    activeSizes,
    searchParam,
    fromId,
    activeShipping,
  ]);

  const fetchProducts = async (query) => {
    try {
      setIsLoading(true);
      const data = await fetchHorseted(query);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  function handlePricesChange(minPrice, maxPrice) {
    if (maxPrice === "") {
      setActivePrices(`${minPrice * 100}-100000000000`);
    } else if (minPrice === "") {
      setActivePrices(`0-${maxPrice * 100}`);
    } else {
      setActivePrices(`${minPrice * 100}-${maxPrice * 100}`);
    }
  }
  function removeCategoryFilter() {
    setActiveCategory(null);
  }
  function removeStateFilter() {
    setActiveState("");
  }
  function removeShippingFilter() {
    setActiveShipping("");
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
    <div className="container mx-auto px-5">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-4xl font-bold font-mcqueen mb-7">
        Tous les articles
      </h1>
      <div className="w-full flex justify-start">
        <Button
          className="block lg:hidden"
          onClick={() => setIsModalOpen(true)}
        >
          <img src="/icons/filters.svg" alt="filter" className="mr-2" />
          Filtres
        </Button>
      </div>

      {/* Modal for filters on small screens */}
      {isModalOpen && (
        <FiltersModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          activeCategory={activeCategory}
          activeState={activeState}
          activeBrands={activeBrands}
          activeMaterials={activeMaterials}
          activePrices={activePrices}
          activeSizes={activeSizes}
          handleCategoryChange={handleCategoryChange}
          handleStateChange={handleStateChange}
          handleBrandsChange={handleBrandsChange}
          handleMaterialsChange={handleMaterialsChange}
          handlePricesChange={handlePricesChange}
          setActiveSizes={setActiveSizes}
          handleOrderChange={handleOrderChange}
        />
      )}

      <legend className="hidden lg:block font-semibold text-ms uppercase tracking-widest mb-4">
        Filtres :
      </legend>
      <div className="hidden lg:flex gap-x-2">
        <SortSelect
          onOrderChange={handleOrderChange}
          activeOrder={activeOrder}
        />
        <StateSelect
          activeState={activeState}
          onStateChange={handleStateChange}
        />
        <CategorySelect
          onClickProductCategory={handleCategoryChange}
          activeCategory={activeCategory !== null ? activeCategory.id : null}
        />
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
            setActiveSizes={setActiveSizes}
            categoryId={activeCategory.id}
          />
        )}
      </div>
      <div className="flex flex-col items-end">
        <TotalProduct products={products} />
        <div className="h-[1px] bg-grey w-full my-2"></div>
        <button
          onClick={resetFilters}
          className="font-semibold font-mcqueen text-light-green"
        >
          Effacer les filtres
        </button>
      </div>
      <div className="flex gap-2 flex-wrap mb-10 lg:pe-40">
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
        {activeShipping !== "" && (
          <ActiveFilterBtn
            filterName={
              shippingSizeTranslations[activeShipping] || activeShipping
            }
            onRemoveFilter={removeShippingFilter}
          />
        )}
        {searchParam !== null && (
          <ActiveFilterBtn
            filterName={searchParam}
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
                filterName={size.value}
                onRemoveFilter={removeSizeFilter}
              />
            );
          })}
      </div>
      {isLoading ? (
        <Spinner isFullScreen />
      ) : (
        <>
          <ProductsList products={products} />
          <Pagination
            activeBrands={activeBrands}
            products={products}
            setFromId={setFromId}
          />
        </>
      )}
    </div>
  );
}
