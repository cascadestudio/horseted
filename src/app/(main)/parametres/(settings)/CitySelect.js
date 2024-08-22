import Dropdown from "@/components/Dropdown";
import Radio from "@/components/input/Radio";
import { useEffect, useState } from "react";

export default function CitySelect() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //   console.log("cities =>", cities);
  //   console.log("searchTerm =>", searchTerm);

  const handleFilterChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchCities(term);
  };

  const fetchCities = async (term) => {
    if (!term) {
      setCities([]);
      return;
    }

    const response = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${term}&fields=nom&format=json`
    );
    const data = await response.json();
    if (data && Array.isArray(data)) {
      setCities(data.slice(0, 10).map((city) => city.nom));
    } else {
      setCities([]);
    }
  };

  const handleCheckboxChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  return (
    <Dropdown title="Sélectionnez une ville">
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
            placeholder="Rechercher une ville"
            value={searchTerm}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col gap-y-4 max-h-96 overflow-y-scroll py-4 pe-3">
          {cities.map((city) => (
            <label
              key={city}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              {city}
              <Radio
                className="ml-20"
                value={city}
                onChange={handleCheckboxChange}
                checked={selectedCity === city}
              />
            </label>
          ))}
        </div>
      </div>
    </Dropdown>
  );
}
