import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/input/Checkbox";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

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
    <div className="w-full flex justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
        Couleurs :
      </h3>
      <Dropdown
        title="Sélectionner une ou plusieurs couleurs"
        className="w-full max-w-[700px]"
        isBlack
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
                  <p className="capitalize">{name}</p>
                </div>
                <Checkbox
                  className="ml-10"
                  value={name}
                  checked={product.colors.includes(name)}
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
