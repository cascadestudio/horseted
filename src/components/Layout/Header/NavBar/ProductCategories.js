import { useEffect, useState } from "react";
import Link from "next/link";
import RecursiveSubCategoriesPanel from "./RecursiveSubCategoriesPanel";

export default function ProductCategories({
  subCategories,
  setIsOpen,
  selectedSubCategoriesId,
}) {
  const [itemCategories, setItemCategories] = useState([]);
  const [selectedItemCategoriesId, setSelectedItemCategoriesId] =
    useState(null);

  // console.log("itemCategories =>", itemCategories);

  useEffect(() => {
    setSelectedItemCategoriesId(null);
    if (subCategories && subCategories.length > 0) {
      setItemCategories(
        subCategories.find(
          (subCategory) => subCategory.id === selectedSubCategoriesId
        ).subCategories
      );
    }
  }, [subCategories, selectedSubCategoriesId]);

  const handleSubCategoryClick = (id) => {
    setSelectedItemCategoriesId(id);
  };

  if (selectedItemCategoriesId) {
    return (
      <RecursiveSubCategoriesPanel
        selectedSubCategoriesId={selectedItemCategoriesId}
        subCategories={itemCategories}
        setIsOpen={setIsOpen}
      />
    );
  } else {
    if (itemCategories && itemCategories.length > 0) {
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
  }
}
