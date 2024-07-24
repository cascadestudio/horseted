import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/input/Checkbox";

export default function SizesSelect({
  activeSizes,
  categoryId,
  setActiveSizes,
}) {
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const query = `/categories/${categoryId}/sizes`;
        const data = await fetchHorseted(query);
        setSizes(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSizes();
  }, []);

  const handleCheckboxChange = (item) => {
    setActiveSizes((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  return (
    <Dropdown className="mr-5" title="Tailles">
      <div className="flex flex-col gap-y-4 max-h-96 overflow-y-scroll pe-3">
        {sizes.map((size) => {
          const { id, value } = size;

          return (
            <label
              key={id}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              {value}
              <Checkbox
                className="ml-20"
                value={size.value}
                onChange={() => handleCheckboxChange(size)}
                checked={activeSizes.includes(size)}
              />
            </label>
          );
        })}
      </div>
    </Dropdown>
  );
}
