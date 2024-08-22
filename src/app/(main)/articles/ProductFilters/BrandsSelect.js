import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/input/Checkbox";
import Radio from "@/components/input/Radio";

export default function BrandSelect({
  activeBrands = [],
  onBrandsChange,
  className,
  isBlack,
  isRadio,
}) {
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
      className={className}
      title="Marques"
      isActive={activeBrands.length > 0}
      isBlack={isBlack}
    >
      <div className="flex flex-col pt-4">
        <div className="flex items-center border-black border-b">
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
        <div className="flex flex-col gap-y-4 max-h-96 overflow-y-scroll py-4 pe-3">
          {filteredBrands.map(({ name }) => (
            <label
              key={name}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              {name}
              {isRadio ? (
                <Radio
                  className="ml-20"
                  value={name}
                  onChange={onBrandsChange}
                  checked={activeBrands?.includes(name)}
                />
              ) : (
                <Checkbox
                  className="ml-20"
                  value={name}
                  onChange={handleCheckboxChange}
                  checked={activeBrands?.includes(name)}
                />
              )}
            </label>
          ))}
        </div>
      </div>
    </Dropdown>
  );
}
