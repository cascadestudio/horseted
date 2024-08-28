import React from "react";
import MaterialSelect from "../../articles/ProductFilters/MaterialsSelect";

export default function Materials({ product, setProduct }) {
  const onMaterialsChange = (materials) => {
    setProduct((prev) => ({ ...prev, materials: materials }));
  };

  return (
    <div className="w-full flex justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
        Matière :
      </h3>
      <MaterialSelect
        activeMaterials={product.materials}
        onMaterialsChange={onMaterialsChange}
        title="Sélectionner une matière"
        className="w-full max-w-[700px]"
        isBlack
      />
    </div>
  );
}
