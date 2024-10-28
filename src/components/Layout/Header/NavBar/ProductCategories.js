import { useEffect, useState } from "react";
import Link from "next/link";
import RecursiveSubCategoriesPanel from "./RecursiveSubCategoriesPanel";

function Category({
  category,
  expandedCategoryId,
  onCategoryClick,
  setIsOpen,
}) {
  const { name, id, hasChildren } = category;
  const isExpanded = expandedCategoryId === id;

  if (hasChildren) {
    return (
      <>
        <button
          className="whitespace-nowrap font-medium p-2 block"
          onClick={() => onCategoryClick(id)}
        >
          {name}
        </button>

        {isExpanded && (
          <>
            {category.subCategories.map((subCategory) => (
              <Category
                key={subCategory.id}
                category={subCategory}
                onCategoryClick={() => {}}
              />
            ))}
          </>
        )}
      </>
    );
  } else {
    return (
      <Link
        onClick={() => setIsOpen(false)}
        className="whitespace-nowrap font-medium p-2 block"
        href={`/articles?categoryId=${id}&categoryName=${name}`}
      >
        {name}
      </Link>
    );
  }
}

export default function ProductCategories({ setIsOpen, selectedSubCategory }) {
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  const handleCategoryClick = (id) => {
    setExpandedCategoryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="px-5 py-2">
      <ul
        className={
          selectedSubCategory.subCategories.length > 12 ? `columns-2` : ``
        }
      >
        {selectedSubCategory.subCategories.map((category) => {
          return (
            <Category
              key={category.id}
              category={category}
              expandedCategoryId={expandedCategoryId}
              onCategoryClick={handleCategoryClick}
              setIsOpen={setIsOpen}
            />
          );
        })}
      </ul>
    </div>
  );
}
