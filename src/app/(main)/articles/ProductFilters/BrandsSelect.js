import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/input/Checkbox";

export default function BrandSelect({ activeBrands, onBrandsChange }) {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const query = `/brands`;
        const data = await fetchHorseted(query);
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

  const handleCheckboxChange = (e) => {
    const brand = e.target.value;
    if (e.target.checked) {
      onBrandsChange([...activeBrands, brand]);
    } else {
      onBrandsChange(
        activeBrands.filter((checkedBrand) => checkedBrand !== brand)
      );
    }
  };

  return (
    <Dropdown
      className="mr-5"
      title="Marques"
      isActive={activeBrands.length > 0}
    >
      <div className="flex flex-col">
        <div className="flex items-center mb-4 border-black border-b">
          <img
            className="h-[13px] mr-2 border-black border-r px-2"
            src="/icons/search.svg"
            alt=""
          />
          <input
            className="border-none"
            type="text"
            placeholder="Rechercher une marque"
            value={searchTerm}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col gap-y-4 max-h-96 overflow-y-scroll pe-3">
          {filteredBrands.map(({ name }) => (
            <label
              key={name}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              {name}
              <Checkbox
                className="ml-20"
                value={name}
                onChange={handleCheckboxChange}
                checked={activeBrands?.includes(name)}
              />
            </label>
          ))}
        </div>
      </div>
    </Dropdown>
  );
}
