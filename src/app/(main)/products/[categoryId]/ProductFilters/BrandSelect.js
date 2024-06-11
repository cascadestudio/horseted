import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function BrandSelect({ onBrandChange }) {
  const [brands, setBrands] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = brands.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <button onClick={() => setIsDropdown(!isDropdown)}>Marque</button>
      {isDropdown && (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Rechercher une marque"
            value={searchTerm}
            onChange={handleFilterChange}
          />
          {filteredBrands.map(({ name }) => (
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
