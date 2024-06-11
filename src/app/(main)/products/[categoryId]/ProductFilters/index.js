import { useState } from "react";
import CategorySelect from "./CategorySelect";
import BrandsSelect from "./BrandsSelect";
import MaterialsSelect from "./MaterialsSelect";
import SizesSelect from "./SizesSelect";
import PricesSelect from "./PricesSelect";

export default function ProductFilters({
  activeOrder,
  onOrderChange,
  onCategoryChange,
  onStateChange,
  onBrandsChange,
  onMaterialsChange,
  onSizesChange,
  onPricesChange,
}) {
  const [isStateDropdown, setIsStateDropdown] = useState(false);

  return (
    <div className="flex">
      <div className="p-5">
        <label htmlFor="sort">Trier par</label>
        <select
          id="sort"
          onChange={(e) => onOrderChange(e.target.value)}
          value={activeOrder}
        >
          <option value="createdAt;desc">Nouveautés</option>
          <option value="visitCount;desc">Populaires</option>
          <option value="price;asc">Prix croissant</option>
          <option value="price;desc">Prix décroissant</option>
        </select>
      </div>
      <div className="p-5">
        <CategorySelect onClickProductCategory={onCategoryChange} />
      </div>
      <div className="p-5">
        <button onClick={() => setIsStateDropdown(!isStateDropdown)}>
          État
        </button>
        {isStateDropdown && (
          <div className="flex flex-col">
            <label>
              Neuf avec emballage
              <input
                type="radio"
                name="productState"
                value="new_with_packaging"
                onChange={(e) => onStateChange(e.target.value)}
              />
            </label>
            <label>
              Neuf sans emballage
              <input
                type="radio"
                name="productState"
                value="new_without_packaging"
                onChange={(e) => onStateChange(e.target.value)}
              />
            </label>

            <label>
              Très bon état
              <input
                type="radio"
                name="productState"
                value="perfect"
                onChange={(e) => onStateChange(e.target.value)}
              />
            </label>
            <label>
              Bon état
              <input
                type="radio"
                name="productState"
                value="very_good"
                onChange={(e) => onStateChange(e.target.value)}
              />
            </label>
            <label>
              Satisfaisant
              <input
                type="radio"
                name="productState"
                value="good"
                onChange={(e) => onStateChange(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>
      <BrandsSelect onBrandsChange={onBrandsChange} />
      <PricesSelect onPricesChange={onPricesChange} />
      <MaterialsSelect onMaterialsChange={onMaterialsChange} />
      {/* <SizesSelect onSizesChange={onSizesChange} /> */}
    </div>
  );
}
