import Dropdown from "@/components/Dropdown";
import Radio from "@/components/input/Radio";

export default function SortSelect({ onOrderChange, activeOrder }) {
  const orders = [
    { label: "Nouveautés", param: "createdAt;desc" },
    { label: "Populaires", param: "visitCount;desc" },
    { label: "Prix croissant", param: "price;asc" },
    { label: "Prix décroissant", param: "price;desc" },
  ];

  return (
    <Dropdown title="Trier par" isActive={activeOrder !== null}>
      <div className="flex flex-col px-2 py-4 gap-y-4">
        {orders.map((order, index) => {
          const { label, param } = order;
          return (
            <label
              key={index}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              {label}
              <Radio
                className="ml-10"
                value={param}
                checked={activeOrder === param}
                onChange={onOrderChange}
              />
            </label>
          );
        })}
      </div>
    </Dropdown>
  );
}
