import Link from "next/link";
import LeftArrow from "@/assets/icons/LeftArrow";

function Category({
  category,
  expandedCategoryId,
  onCategoryClick,
  setIsOpen,
  isActive,
}) {
  const { name, id, hasChildren, subCategories } = category;
  const isExpanded = expandedCategoryId === id;

  if (hasChildren) {
    return (
      <>
        <button
          className="whitespace-nowrap font-medium p-2 block"
          onClick={() => onCategoryClick(id)}
        >
          {isActive ? (
            <div className="flex items-center">
              <LeftArrow className="stroke-light-green mr-2" />
              <p className="font-bold text-light-green">{name}</p>
            </div>
          ) : (
            name
          )}
        </button>

        {isExpanded && subCategories && (
          <>
            {subCategories.map((subCategory) => (
              <Category
                key={subCategory.id}
                category={subCategory}
                expandedCategoryId={expandedCategoryId}
                onCategoryClick={onCategoryClick}
                setIsOpen={setIsOpen}
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

export default function ProductCategories({
  setIsOpen,
  selectedSubCategory,
  expandedCategoryId,
  setExpandedCategoryId,
}) {
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
          const isActive = expandedCategoryId === category.id;
          if (expandedCategoryId === null || isActive) {
            return (
              <Category
                isActive={isActive}
                key={category.id}
                category={category}
                expandedCategoryId={expandedCategoryId}
                onCategoryClick={handleCategoryClick}
                setIsOpen={setIsOpen}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}
