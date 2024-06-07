import CategorySelect from "./CategorySelect";

export default function ProductFilters({
  orderBy,
  onOrderChange,
  onCategoryChange,
  categories,
  activeCategory,
}) {
  return (
    <div className="flex">
      <div className="p-5">
        <label htmlFor="sort">Trier par</label>
        <select
          id="sort"
          onChange={(e) => onOrderChange(e.target.value)}
          value={orderBy}
        >
          <option value="createdAt;desc">Nouveautés</option>
          <option value="visitCount;desc">Populaires</option>
          <option value="price;asc">Prix croissant</option>
          <option value="price;desc">Prix décroissant</option>
        </select>
      </div>
      <div className="p-5">
        <CategorySelect onCategoryChange={onCategoryChange} />
      </div>
    </div>
  );
}
