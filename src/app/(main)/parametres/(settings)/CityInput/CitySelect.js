import Dropdown from "@/components/Dropdown";
import Radio from "@/components/input/Radio";
import { patchAddress } from "@/fetch/addresses";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function CitySelect({ shippingAddress }) {
  const { accessToken } = useAuthContext();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(shippingAddress.city);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log("shippingAddress.city =>", shippingAddress.city);
  // console.log("selectedCity =>", selectedCity);

  useEffect(() => {
    setSelectedCity(shippingAddress.city);
  }, [shippingAddress.city]);

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

  const handleCheckboxChange = async (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    const body = {
      fullName: shippingAddress.fullName,
      street: shippingAddress.street,
      postalCode: shippingAddress.postalCode,
      city: city,
      // country: shippingAddress.country,
      isDefault: true,
      accountToken: accessToken,
    };
    console.log("body =>", body);
    await patchAddress(accessToken, body, shippingAddress.id);
  };

  return (
    <Dropdown
      title={selectedCity || "Sélectionnez une ville"}
      className="w-full lg:max-w-[300px]"
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

{
  /* <div className="relative flex items-center border border-black rounded-md p-3">
            <CityIcon className="w-5 h-5 stroke-current fill-none mr-3" />
            <span className="flex-grow font-poppins font-medium">
              {formData.city || "Sélectionnez une ville"}
            </span>
            <label className="flex items-center cursor-pointer">
              <ModifyIcon className="w-9 h-9" />
            </label>
          </div> */
}
