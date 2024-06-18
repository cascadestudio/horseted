import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function BrandSelect({ onBrandsChange }) {
  const [brands, setBrands] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedBrands, setCheckedBrands] = useState([]);

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

  useEffect(() => {
    onBrandsChange(checkedBrands);
  }, [checkedBrands]);

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = brands.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (e) => {
    const brand = e.target.value;
    if (e.target.checked) {
      setCheckedBrands([...checkedBrands, brand]);
    } else {
      setCheckedBrands(
        checkedBrands.filter((checkedBrand) => checkedBrand !== brand)
      );
    }
  };

  return (
    <div className="p-5">
      <button onClick={() => setIsDropdown(!isDropdown)}>Marques</button>
      {isDropdown && (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Rechercher une marque"
            value={searchTerm}
            onChange={handleFilterChange}
          />
          {filteredBrands.map(({ name }) => (
            <label key={name}>
              {name}
              <input
                type="checkbox"
                value={name}
                onChange={(e) => handleCheckboxChange(e)}
                checked={checkedBrands.includes(name)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
