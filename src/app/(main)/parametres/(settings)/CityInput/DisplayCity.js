import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

export default function DisplayCity({ accessToken }) {
  const [showCity, setShowCity] = useState(null);

  useEffect(() => {
    getSettings();
  }, []);

  async function getSettings() {
    const settings = await fetchHorseted(`/users/me/settings`, accessToken);
    setShowCity(settings.showCity);
  }

  const handleChange = () => {
    setShowCity(!showCity);
    patchSettings(!showCity);
  };

  async function patchSettings(showCity) {
    const settings = {
      showCity: showCity,
    };
    await fetchHorseted(
      `/users/me/settings`,
      accessToken,
      "PATCH",
      settings,
      true,
      true
    );
  }

  if (showCity === null) return;

  return (
    <div className="flex items-center justify-end mt-3">
      <label htmlFor="publicCity">
        <span className="text-sm mr-2">Afficher publiquement la ville</span>
        <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            id="publicCity"
            checked={showCity}
            onChange={handleChange}
            className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
          />
          <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
        </div>
      </label>
    </div>
  );
}
