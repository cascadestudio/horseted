import Dropdown from "@/components/Dropdown";

export default function SortSelect({ onOrderChange, activeOrder }) {
  return (
    <Dropdown title="Trier par">
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
    </Dropdown>
  );
}
