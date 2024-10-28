import Link from "next/link";

export default function RecursiveSubCategoriesPanel({
  itemCategory,
  setIsOpen,
  setSelectedItemCategory,
}) {
  return (
    <div className="px-5 py-2">
      <button onClick={() => setSelectedItemCategory(null)}>
        {itemCategory.name}
      </button>
      <ul className={itemCategory.subCategories.length > 12 ? `columns-2` : ``}>
        {itemCategory.subCategories.map((category) => {
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
