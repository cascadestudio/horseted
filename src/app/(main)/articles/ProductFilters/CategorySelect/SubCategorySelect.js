import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";

export default function SubCategorySelect({
  activeParentCategory,
  onClickSubCategory,
  activeSubCategory,
  onClickPrev,
}) {
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeParentCategory.id}`;
        const data = await fetch(query);
        setSubCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    activeParentCategory !== null && fetchCategories();
  }, [activeParentCategory]);
  return (
    <div>
      <button onClick={() => onClickPrev()}>
        <b>
          {"< "}
          {activeParentCategory.name}
        </b>
      </button>

      <div>
        {activeParentCategory !== null && (
          <div className="flex flex-col">
            {subCategory.map(({ id, name }) => {
              return (
                <button
                  onClick={() => onClickSubCategory(id, name)}
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
    </div>
  );
}
