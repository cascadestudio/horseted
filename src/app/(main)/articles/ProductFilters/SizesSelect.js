import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function SizesSelect({
  activeSizes,
  onSizesChange,
  categoryId,
}) {
  const [sizes, setSizes] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const query = `/categories/${categoryId}/sizes`;
        const data = await fetchData(query);
        setSizes(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSizes();
  }, []);

  const handleCheckboxChange = (e, value) => {
    const id = Number(e.target.value);
    if (e.target.checked) {
      onSizesChange([...activeSizes, { id: id, name: value }]);
    } else {
      onSizesChange(activeSizes.filter((activeSize) => activeSize !== size));
    }
  };

  return (
    <div className="p-5">
      <button onClick={() => setIsDropdown(!isDropdown)}>Tailles</button>
      {isDropdown && (
        <div className="flex flex-col">
          {sizes.map(({ id, value }) => {
            return (
              <label key={id}>
                {value}
                <input
                  type="checkbox"
                  value={id}
                  onChange={(e) => handleCheckboxChange(e, value)}
                  checked={activeSizes.map((size) => size.id).includes(id)}
                />
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
