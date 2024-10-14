import { useEffect, useState } from "react";
import SizesSelect from "../../articles/ProductFilters/SizesSelect";

export default function Size({ product, setProduct }) {
  const [activeSizeName, setActiveSizeName] = useState("");

  const onSizeChange = (id, value) => {
    setProduct((prev) => ({ ...prev, sizeId: id }));
    setActiveSizeName(value);
  };

  if (product.categoryId === "") return;
  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        Taille* :
      </h3>
      <SizesSelect
        activeSizeId={product.sizeId}
        onSizeChange={onSizeChange}
        categoryId={product.categoryId}
        title={activeSizeName || "Sélectionner une taille"}
        className="w-full max-w-[700px]"
        isBlack
        isRadio
      />
    </div>
  );
}
