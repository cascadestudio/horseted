import { useState } from "react";
import CategorySelect from "../../articles/ProductFilters/CategorySelect";

export default function Category({ product, setProduct }) {
  const [activeCategoryName, setActiveCategoryName] = useState("");

  const handleChange = (id, name) => {
    setProduct((prev) => ({ ...prev, categoryId: id }));
    setActiveCategoryName(name);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        Catégorie* :
      </h3>
      <CategorySelect
        onClickProductCategory={handleChange}
        activeCategory={product.categoryId}
        title={
          activeCategoryName === ""
            ? "Sélectionner une catégorie"
            : activeCategoryName
        }
        className="w-full max-w-[700px]"
        isBlack
      />
    </div>
  );
}
