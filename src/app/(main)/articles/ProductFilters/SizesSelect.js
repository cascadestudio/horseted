import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/input/Checkbox";
import Radio from "@/components/input/Radio";

export default function SizesSelect({
  activeSizes,
  categoryId,
  setActiveSizes,
  className,
  isBlack,
  isRadio,
  onSizeChange,
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
    <Dropdown
      className={className}
      title="Tailles"
      isActive={activeSizes.length > 0}
      isBlack={isBlack}
    >
      <div className="flex flex-col gap-y-4 max-h-96 overflow-y-scroll py-4 pe-3">
        {sizes.map((size) => {
          const { id, value } = size;

          return (
            <label
              key={id}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              {value}
              {isRadio ? (
                <Radio
                  className="ml-20"
                  value={id}
                  onChange={onSizeChange}
                  checked={activeSizes?.includes(id)}
                />
              ) : (
                <Checkbox
                  className="ml-20"
                  value={value}
                  onChange={() => handleCheckboxChange(size)}
                  checked={activeSizes?.includes(size)}
                />
              )}
            </label>
          );
        })}
      </div>
    </Dropdown>
  );
}
