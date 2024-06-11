import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function BrandSelect({ onBrandChange }) {
  const [brands, setBrands] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const query = `/brands`;
        const data = await fetchData(query);
        setBrands(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="p-5">
      <button onClick={() => setIsDropdown(!isDropdown)}>Marque</button>
      {isDropdown && (
        <div className="flex flex-col">
          {brands.map(({ name }) => (
            <label>
              {name}
              <input
                type="checkbox"
                value={name}
                onChange={(e) => onBrandChange(e.target.value)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
