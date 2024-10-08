import SortSelect from "./ProductFilters/SortSelect";
import StateSelect from "./ProductFilters/StateSelect";
import BrandsSelect from "./ProductFilters/BrandsSelect";
import CategorySelect from "./ProductFilters/CategorySelect";
import PricesSelect from "./ProductFilters/PricesSelect";
import SizesSelect from "./ProductFilters/SizesSelect";
import MaterialsSelect from "./ProductFilters/MaterialsSelect";
import CloseButton from "@/assets/icons/CloseButton";
import { useEffect } from "react";

export default function FiltersModal({
  activeBrands,
  activeOrder,
  activeState,
  activeCategory,
  activePrices,
  activeSizes,
  activeMaterials,
  isModalOpen,
  setIsModalOpen,
  handleOrderChange,
  handleStateChange,
  handleCategoryChange,
  handleBrandsChange,
  handlePricesChange,
  setActiveSizes,
  handleMaterialsChange,
  resetFilters,
}) {
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
  }, [isModalOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-light-grey w-screen h-screen pt-11 px-5 lg:pt-0 lg:p-5 overflow-y-auto">
        <div className="mb-4 flex justify-between">
          <button
            className="bg-red-500 text-white rounded "
            onClick={() => setIsModalOpen(false)}
          >
            <CloseButton className="w-6 h-6" />
          </button>
          <button
            onClick={resetFilters}
            className="font-semibold font-mcqueen text-light-green"
          >
            Effacer les filtres
          </button>
        </div>
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
      </div>
    </div>
  );
}
