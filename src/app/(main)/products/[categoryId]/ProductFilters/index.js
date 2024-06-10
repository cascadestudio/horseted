import CategorySelect from "./CategorySelect";

export default function ProductFilters({
  activeOrder,
  onOrderChange,
  onCategoryChange,
  onStateChange,
}) {
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
        <label>
          Bon état
          <input
            type="radio"
            name="productState"
            value="good"
            onChange={(e) => onStateChange(e.target.value)}
          />
        </label>
        <label>
          Très bon état
          <input
            type="radio"
            name="productState"
            value="very_good"
            onChange={(e) => onStateChange(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
