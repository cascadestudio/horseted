import { useState } from "react";

export default function StateSelect({ onStateChange }) {
  const [isStateDropdown, setIsStateDropdown] = useState(false);

  return (
    <div className="p-5">
      <button onClick={() => setIsStateDropdown(!isStateDropdown)}>État</button>
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
  );
}
