import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductCategories({
  subCategories,
  setIsOpen,
  selectedSubCategoriesId,
}) {
  const [itemCategories, setItemCategories] = useState([]);

  useEffect(() => {
    if (subCategories && subCategories.length > 0) {
      // console.log("subCategories =>", subCategories);
      setItemCategories(
        subCategories.find(
          (subCategory) => subCategory.id === selectedSubCategoriesId
        ).subCategories
      );
    }
  }, [subCategories, selectedSubCategoriesId]);

  if (itemCategories && itemCategories.length > 0) {
    return (
      <div className="px-5 py-2">
        <ul className={itemCategories.length > 12 ? `columns-2` : ``}>
          {itemCategories.map((category) => {
            const { name, id } = category;
            return (
              <li key={name} className="">
                <Link
                  onClick={() => setIsOpen(false)}
                  className="whitespace-nowrap font-medium p-2 block"
                  href={`/articles?categoryId=${id}&categoryName=${name}`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
