import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function SizesSelect({ onSizesChange, categoryId }) {
  const [sizes, setSizes] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [checkedSizesId, setCheckedSizesId] = useState([]);

  console.log(checkedSizesId);

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

  const handleCheckboxChange = (e) => {
    const sizeId = Number(e.target.value);
    if (e.target.checked) {
      setCheckedSizesId([...checkedSizesId, sizeId]);
    } else {
      setCheckedSizesId(
        checkedSizesId.filter((checkedSizesId) => checkedSizesId !== sizeId)
      );
    }
    onSizesChange(checkedSizesId);
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
                  onChange={(e) => handleCheckboxChange(e)}
                  checked={checkedSizesId.includes(id)}
                />
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
