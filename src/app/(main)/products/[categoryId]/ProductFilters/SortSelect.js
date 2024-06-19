export default function SortSelect({ onOrderChange, activeOrder }) {
  return (
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
  );
}
