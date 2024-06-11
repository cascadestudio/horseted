import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function BrandSelect() {
  const [brands, setBrands] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const query = `/brands`;
        const data = await fetchData(query);
        console.log(data);
        setBrands(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div>
      <button onClick={() => setIsDropdown(!isDropdown)}>Marque</button>
      {isDropdown && (
        <div className="flex flex-col">
          {brands.map(({ name }) => (
            <label>
              {name}
              <input
                type="checkbox"
                value={name}
                onChange={(e) => onStateChange(e.target.value)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
