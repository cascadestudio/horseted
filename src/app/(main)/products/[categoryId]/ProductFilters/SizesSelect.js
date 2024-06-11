import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function SizesSelect({ onSizesChange }) {
  const [sizes, setSizes] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [checkedSizes, setCheckedSizes] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const query = `/sizes`;
        const data = await fetchData(query);
        setSizes(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSizes();
  }, []);

  const handleCheckboxChange = (e) => {
    const size = e.target.value;
    if (e.target.checked) {
      setCheckedSizes([...checkedSizes, size]);
    } else {
      setCheckedSizes(
        checkedSizes.filter((checkedSize) => checkedSize !== size)
      );
    }
    onSizesChange(checkedSizes);
  };

  return (
    <div className="p-5">
      <button onClick={() => setIsDropdown(!isDropdown)}>Tailles</button>
      {isDropdown && (
        <div className="flex flex-col">
          {sizes.map(({ name }) => (
            <label key={name}>
              {name}
              <input
                type="checkbox"
                value={name}
                onChange={(e) => handleCheckboxChange(e)}
                checked={checkedSizes.includes(name)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
