import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

export default function Color({ product, setProduct }) {
  //   useEffect(() => {
  //     setProduct((prev) => ({ ...prev, size: activeSizes }));
  //   }, [activeSizes]);

  const [colors, setColors] = useState([]);

  console.log("colors =>", colors);

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    const query = `/colors`;
    const data = await fetchHorseted(query);
    setColors(data);
  };

  return (
    <div className="w-full flex justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
        Couleurs :
      </h3>
      {/* <Dropdown
        title="Sélectionner une couleur"
        className="w-full max-w-[700px]"
        isBlack
      /> */}
    </div>
  );
}
