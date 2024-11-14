import Link from "next/link";
import LeftArrow from "@/assets/icons/LeftArrow";
import capitalizeText from "@/utils/capitalizeText";

function Category({
  category,
  expandedCategoryId,
  onCategoryClick,
  setIsOpen,
  isActive,
}) {
  const { name, id, hasChildren, subCategories, parentId } = category;
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
              <p className="font-bold text-light-green">
                {capitalizeText(name)}
              </p>
            </div>
          ) : (
            capitalizeText(name)
          )}
        </button>

        {isExpanded && subCategories && (
          <div>
            <Link
              onClick={() => setIsOpen(false)}
              className="whitespace-nowrap font-medium p-2 block"
              href={`/articles?categoryId=${id}&categoryName=${name}`}
            >
              Voir tout
            </Link>
            <ul className={subCategories.length > 12 ? `columns-2` : ``}>
              {subCategories.map((subCategory) => (
                <Category
                  key={subCategory.id}
                  category={subCategory}
                  expandedCategoryId={expandedCategoryId}
                  onCategoryClick={onCategoryClick}
                  setIsOpen={setIsOpen}
                />
              ))}
            </ul>
          </div>
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
        {capitalizeText(name)}
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

  const { id, name } = selectedSubCategory;

  return (
    <div className="px-5 py-2 min-w-64">
      {expandedCategoryId === null && (
        <Link
          onClick={() => setIsOpen(false)}
          className="whitespace-nowrap font-medium p-2 block"
          href={`/articles?categoryId=${id}&categoryName=${name}`}
        >
          Voir tout
        </Link>
      )}
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
