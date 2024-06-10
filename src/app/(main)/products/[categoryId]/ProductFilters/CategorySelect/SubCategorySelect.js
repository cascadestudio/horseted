import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function SubCategorySelect({
  activeParentCategory,
  onClickSubCategory,
  activeSubCategory,
}) {
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeParentCategory}`;
        const data = await fetchData(query);
        setSubCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    activeParentCategory && fetchCategories();
  }, [activeParentCategory]);
  return (
    <div>
      {activeParentCategory !== null && (
        <div className="flex flex-col">
          {subCategory.map(({ id, name }) => {
            return (
              <button
                onClick={() => onClickSubCategory(id)}
                className={activeSubCategory === id ? "active" : ""}
                key={id}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
