import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function MaterialSelect({ activeMaterials, onMaterialsChange }) {
  const [materials, setMaterials] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const query = `/materials`;
        const data = await fetchData(query);
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
    <div className="p-5">
      <button onClick={() => setIsDropdown(!isDropdown)}>Matières</button>
      {isDropdown && (
        <div className="flex flex-col">
          {materials.map(({ name }) => (
            <label key={name}>
              {name}
              <input
                type="checkbox"
                value={name}
                onChange={(e) => handleCheckboxChange(e)}
                checked={activeMaterials.includes(name)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
