import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";

export default function ProductCategorySelect({
  activeSubCategory,
  onClickProductCategory,
  onClickPrev,
}) {
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeSubCategory.id}`;
        const data = await fetch(query);
        setProductCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    activeSubCategory !== null && fetchCategories();
  }, [activeSubCategory]);

  return (
    <div>
      <button onClick={() => onClickPrev()}>
        <b>
          {"< "} {activeSubCategory.name}
        </b>
      </button>

      <div>
        {activeSubCategory !== null && (
          <div className="flex flex-col">
            {productCategory.map(({ id, name }) => {
              return (
                <button
                  onClick={() => onClickProductCategory(id, name)}
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
