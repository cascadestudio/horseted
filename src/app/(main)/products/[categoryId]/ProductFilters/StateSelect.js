import { useState } from "react";

export default function StateSelect({ onStateChange, activeState }) {
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
              checked={activeState === "new_with_packaging"}
            />
          </label>
          <label>
            Neuf sans emballage
            <input
              type="radio"
              name="productState"
              value="new_without_packaging"
              onChange={(e) => onStateChange(e.target.value)}
              checked={activeState === "new_without_packaging"}
            />
          </label>

          <label>
            Très bon état
            <input
              type="radio"
              name="productState"
              value="perfect"
              onChange={(e) => onStateChange(e.target.value)}
              checked={activeState === "perfect"}
            />
          </label>
          <label>
            Bon état
            <input
              type="radio"
              name="productState"
              value="very_good"
              onChange={(e) => onStateChange(e.target.value)}
              checked={activeState === "very_good"}
            />
          </label>
          <label>
            Satisfaisant
            <input
              type="radio"
              name="productState"
              value="good"
              onChange={(e) => onStateChange(e.target.value)}
              checked={activeState === "good"}
            />
          </label>
        </div>
      )}
    </div>
  );
}
