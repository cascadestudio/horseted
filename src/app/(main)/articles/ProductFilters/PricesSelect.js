import Dropdown from "@/components/Dropdown";
import { useState } from "react";

export default function PricesSelect({ onPricesChange, activePrices }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    setMinPrice(value);
    onPricesChange(value, maxPrice);
  };

  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    setMaxPrice(value);
    onPricesChange(minPrice, value);
  };

  return (
    <Dropdown title="Prix" isActive={(minPrice || maxPrice) !== ""}>
      <div className="flex flex-col">
        <div className="flex gap-x-4">
          <label className="flex flex-col">
            De
            <input
              type="text"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="€"
            />
          </label>
          <label className="flex flex-col">
            À
            <input
              placeholder="€"
              type="text"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </label>
        </div>
      </div>
    </Dropdown>
  );
}
