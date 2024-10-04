import { useEffect, useState } from "react";
import SizesSelect from "../../articles/ProductFilters/SizesSelect";

export default function Size({ product, setProduct }) {
  const onSizeChange = (e) => {
    const sizeId = e.target.value;
    setProduct((prev) => ({ ...prev, sizeId: sizeId }));
  };

  if (product.categoryId === "") return;
  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        Taille* :
      </h3>
      <SizesSelect
        activeSizes={product.sizeId}
        onSizeChange={onSizeChange}
        categoryId={product.categoryId}
        title="Sélectionner une taille"
        className="w-full max-w-[700px]"
        isBlack
        isRadio
      />
    </div>
  );
}
