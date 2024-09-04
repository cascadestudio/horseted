import StateSelect from "../../articles/ProductFilters/StateSelect";

export default function Category({ product, setProduct }) {
  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, state: e.target.value }));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        État* :
      </h3>
      <StateSelect
        onStateChange={handleChange}
        activeState={product.state}
        required
        title={product.state === "" ? "État de l’article" : product.state}
        className="w-full max-w-[700px]"
        isBlack
      />
    </div>
  );
}
