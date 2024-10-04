import React from "react";
import BrandSelect from "../../articles/ProductFilters/BrandsSelect";

export default function Brand({ product, setProduct }) {
  const onBrandsChange = (e) => {
    const brand = e.target.value;
    setProduct((prev) => ({ ...prev, brand }));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        Marque* :
      </h3>
      <BrandSelect
        activeBrands={product.brand}
        onBrandsChange={onBrandsChange}
        title="Sélectionner une marque"
        className="w-full max-w-[700px]"
        isBlack
        isRadio
      />
    </div>
  );
}
