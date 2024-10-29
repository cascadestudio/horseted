export default function Category({
  category,
  expandedCategoryId,
  onCategoryClick,
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
              <p className="font-bold text-light-green">{name}</p>
            </div>
          ) : (
            name
          )}
        </button>

        {isExpanded && subCategories && (
          <ul className={subCategories.length > 12 ? `columns-2` : ``}>
            {subCategories.map((subCategory) => (
              <Category
                key={subCategory.id}
                category={subCategory}
                expandedCategoryId={expandedCategoryId}
                onCategoryClick={onCategoryClick}
              />
            ))}
          </ul>
        )}
      </>
    );
  } else {
    return (
      <Link
        onClick={() => {}}
        className="whitespace-nowrap font-medium p-2 block"
        href={`/articles?categoryId=${id}&categoryName=${name}`}
      >
        {name}
      </Link>
    );
  }
}
