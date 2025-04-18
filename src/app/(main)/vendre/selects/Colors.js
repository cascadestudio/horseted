import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/input/Checkbox";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import capitalizeText from "@/utils/capitalizeText";

export default function Colors({ product, setProduct }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    const query = `/colors`;
    const data = await fetchHorseted(query);
    setColors(data);
  };

  const handleCheckboxChange = (e) => {
    const color = e.target.value;
    setProduct((prev) => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color];

      return { ...prev, colors: newColors };
    });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        Couleurs* :
      </h3>
      <Dropdown
        title="Sélectionner une ou plusieurs couleurs"
        className="w-full max-w-full lg:max-w-[700px]"
        isBlack
        isActive={product.colors.length > 0}
      >
        <div className="flex flex-col gap-y-4 py-4 max-h-96 overflow-y-scroll pe-3">
          {colors.map((color, index) => {
            const { hex, name } = color;
            return (
              <label
                key={index}
                className="flex justify-between items-center cursor-pointer font-semibold"
              >
                <div className="flex items-center">
                  <aside
                    className="h-8 w-8 rounded-full mr-2"
                    style={{ backgroundColor: `${hex}` }}
                  ></aside>
                  <p>{capitalizeText(name)}</p>
                </div>
                <Checkbox
                  className="ml-10"
                  value={hex}
                  checked={product.colors.includes(hex)}
                  onChange={handleCheckboxChange}
                />
              </label>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
}
