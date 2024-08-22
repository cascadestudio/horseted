import React from "react";
import BrandSelect from "../../articles/ProductFilters/BrandsSelect";

export default function Brand({ product, setProduct }) {
  const onBrandsChange = (e) => {
    const brand = e.target.value;
    setProduct((prev) => ({ ...prev, brand }));
  };

  return (
    <div className="w-full flex justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto">Marque :</h3>
      <BrandSelect
        onBrandsChange={onBrandsChange}
        categoryId={product.categoryId}
        title="Sélectionner une marque"
        className="w-full max-w-[700px]"
        isBlack
        isRadio
      />
    </div>
  );
}
