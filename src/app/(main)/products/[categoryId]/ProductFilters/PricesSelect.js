import { useState } from "react";

export default function PricesSelect({ onPricesChange }) {
  const [minPrice, setMinPrice] = useState([]);
  const [maxPrice, setMaxPrice] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    onPricesChange(minPrice, maxPrice);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    onPricesChange(minPrice, maxPrice);
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
