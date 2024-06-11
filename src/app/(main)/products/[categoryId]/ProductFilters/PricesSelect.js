import { useState } from "react";

export default function PricesSelect({ onPricesChange }) {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isDropdown, setIsDropdown] = useState(false);

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
    <div className="p-5">
      <button onClick={() => setIsDropdown(!isDropdown)}>Prix</button>
      {isDropdown && (
        <div className="flex flex-col">
          <label>De</label>
          <input
            type="text"
            placeholder="0"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <label>À</label>
          <input
            type="text"
            placeholder="250"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      )}
    </div>
  );
}
