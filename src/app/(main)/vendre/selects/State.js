import StateSelect from "../../articles/ProductFilters/StateSelect";

const states = [
  {
    label: "Neuf avec emballage",
    param: "new_with_packaging",
  },
  {
    label: "Neuf sans emballage",
    param: "new_without_packaging",
  },
  {
    label: "Très bon état",
    param: "perfect",
  },
  {
    label: "Bon état",
    param: "very_good",
  },
  {
    label: "Mauvais état",
    param: "bad",
  },
];

export default function Category({ product, setProduct }) {
  const translatedState =
    states.find((state) => state.param === product.state)?.label ||
    "État de l’article";

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, state: e.target.value }));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        État :
      </h3>
      <StateSelect
        onStateChange={handleChange}
        activeState={product.state}
        required
        title={translatedState}
        className="w-full max-w-[700px]"
        isBlack
      />
    </div>
  );
}
