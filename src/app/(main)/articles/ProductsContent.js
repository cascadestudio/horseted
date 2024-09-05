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
import CloseButton from "@/assets/icons/CloseButton";
import Button from "@/components/Button";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryIdQuery = searchParams.get("categoryId");
  const categoryNameQuery = searchParams.get("categoryName");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Filters states
  const [activeOrder, setActiveOrder] = useState("createdAt;desc"); //TODO quand Jojo l'a fait useState("visitCount;desc")
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeState, setActiveState] = useState("");
  const [activeBrands, setActiveBrands] = useState([]);
  const [activeMaterials, setActiveMaterials] = useState([]);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activePrices, setActivePrices] = useState("");
  const [fromId, setFromId] = useState(null);

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
        if (fromId !== null) {
          query += `&fromId=${fromId}`;
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
    fromId,
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-light-grey w-screen h-screen p-4 overflow-hidden">
            <button
              className="mb-4 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              <CloseButton className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-y-4">
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
                activeCategory={
                  activeCategory !== null ? activeCategory.id : null
                }
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
          </div>
        </div>
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
                filterName={size.value}
                onRemoveFilter={removeSizeFilter}
              />
            );
          })}
      </div>
      {isLoading ? (
        <Spinner />
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
