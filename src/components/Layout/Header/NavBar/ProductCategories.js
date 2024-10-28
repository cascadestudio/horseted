import { useEffect, useState } from "react";
import Link from "next/link";
import RecursiveSubCategoriesPanel from "./RecursiveSubCategoriesPanel";

export default function ProductCategories({
  subCategories,
  setIsOpen,
  selectedSubCategory,
}) {
  const [itemCategories, setItemCategories] = useState([]);
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);

  return (
    <div className="p-4">
      {selectedSubCategory.subCategories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );

  // console.log("itemCategories =>", itemCategories);

  // useEffect(() => {
  //   setSelectedItemCategory(null);
  //   if (subCategories && subCategories.length > 0) {
  //     setItemCategories(
  //       subCategories.find(
  //         (subCategory) => subCategory.id === selectedSubCategoriesId
  //       ).subCategories
  //     );
  //   }
  // }, [subCategories, selectedSubCategoriesId]);

  // if (selectedItemCategory) {
  //   return (
  //     <RecursiveSubCategoriesPanel
  //       itemCategory={selectedItemCategory}
  //       setIsOpen={setIsOpen}
  //       setSelectedItemCategory={setSelectedItemCategory}
  //     />
  //   );
  // } else {
  //   if (itemCategories && itemCategories.length > 0) {
  //     return (
  //       <div className="px-5 py-2">
  //         <ul className={itemCategories.length > 12 ? `columns-2` : ``}>
  //           {itemCategories.map((category) => {
  //             const { name, id, hasChildren } = category;
  //             return (
  //               <li key={name} className="">
  //                 {hasChildren ? (
  //                   <button onClick={() => setSelectedItemCategory(category)}>
  //                     {name}
  //                   </button>
  //                 ) : (
  //                   <Link
  //                     onClick={() => setIsOpen(false)}
  //                     className="whitespace-nowrap font-medium p-2 block"
  //                     href={`/articles?categoryId=${id}&categoryName=${name}`}
  //                   >
  //                     {name}
  //                   </Link>
  //                 )}
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //     );
  //   }
  // }
}

function Category({ category }) {
  const [showSubCategories, setShowSubCategories] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setShowSubCategories(!showSubCategories)}
        className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
      >
        {category.name}
      </button>

      {showSubCategories &&
        category.subCategories &&
        category.subCategories.length > 0 && (
          <div className="pl-4 mt-2 border-l-2 border-gray-200">
            {category.subCategories.map((subCategory) => (
              <Category key={subCategory.id} category={subCategory} />
            ))}
          </div>
        )}
    </div>
  );
}
