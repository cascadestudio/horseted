import { useEffect, useState } from "react";
import SizesSelect from "../articles/ProductFilters/SizesSelect";

export default function Size({ product, setProduct }) {
  const [activeSizes, setActiveSizes] = useState([]);
  // TODO with one value
  useEffect(() => {
    setProduct((prev) => ({ ...prev, size: activeSizes }));
  }, [activeSizes]);

  console.log("activeSizes =>", activeSizes);

  if (product.categoryId === null) return;
  return (
    <div className="w-full flex justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto">Taille :</h3>
      <SizesSelect // TODO option not checkbox
        activeSizes={activeSizes}
        setActiveSizes={setActiveSizes}
        categoryId={product.categoryId}
        title="Sélectionner une taille"
        className="w-full max-w-[700px]"
        isBlack
      />
    </div>
  );
}
