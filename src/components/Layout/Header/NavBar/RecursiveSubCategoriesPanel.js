import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecursiveSubCategoriesPanel({
  selectedSubCategoriesId,
  subCategories,
  setIsOpen,
}) {
  const [itemCategories, setItemCategories] = useState([]);

  console.log("itemCategories =>", itemCategories);

  useEffect(() => {
    if (subCategories && subCategories.length > 0) {
      console.log("subCategories =>", subCategories);
      setItemCategories(
        subCategories.find(
          (subCategory) => subCategory.id === selectedSubCategoriesId
        ).subCategories
      );
    }
  }, [subCategories, selectedSubCategoriesId]);

  return (
    <div className="px-5 py-2">
      <ul className={itemCategories.length > 12 ? `columns-2` : ``}>
        {itemCategories.map((category) => {
          const { name, id, hasChildren } = category;
          return (
            <li key={name} className="">
              {hasChildren ? (
                <button onClick={() => handleSubCategoryClick(id)}>
                  {name}
                </button>
              ) : (
                <Link
                  onClick={() => setIsOpen(false)}
                  className="whitespace-nowrap font-medium p-2 block"
                  href={`/articles?categoryId=${id}&categoryName=${name}`}
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
