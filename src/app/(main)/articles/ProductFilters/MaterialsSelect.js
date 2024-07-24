import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/input/Checkbox";

export default function MaterialSelect({ activeMaterials, onMaterialsChange }) {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const query = `/materials`;
        const data = await fetchHorseted(query);
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleCheckboxChange = (e) => {
    const material = e.target.value;
    if (e.target.checked) {
      onMaterialsChange([...activeMaterials, material]);
    } else {
      onMaterialsChange(
        activeMaterials.filter(
          (checkedMaterial) => checkedMaterial !== material
        )
      );
    }
  };

  return (
    <Dropdown className="mr-5" title="Matières">
      <div className="flex flex-col gap-y-4 max-h-96 overflow-y-scroll pe-3">
        {materials.map(({ name }) => (
          <label
            key={name}
            className="flex justify-between items-center cursor-pointer font-semibold"
          >
            {name}
            <Checkbox
              className="ml-20"
              value={name}
              onChange={(e) => handleCheckboxChange(e)}
              checked={activeMaterials.includes(name)}
            />
          </label>
        ))}
      </div>
    </Dropdown>
  );
}
