import { useEffect, useState } from "react";
import { fetchData } from "@/libs/fetch";

export default function ProductCategorySelect({
  activeSubCategory,
  onClickProductCategory,
}) {
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeSubCategory}`;
        const data = await fetchData(query);
        setProductCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    activeSubCategory && fetchCategories();
  }, [activeSubCategory]);

  return (
    <div>
      {activeSubCategory !== null && (
        <div className="flex flex-col">
          {productCategory.map(({ id, name }) => {
            return (
              <button onClick={() => onClickProductCategory(id)} key={id}>
                {name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
