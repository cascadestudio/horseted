import Dropdown from "@/components/Dropdown";
import Radio from "@/components/input/Radio";

export default function Shipping({ product, setProduct }) {
  const shippings = [
    {
      value: "small",
      name: "Petit",
      description:
        "Idéal pour des accessoires légers tels que des gants d'équitation ou des petits équipements.",
    },
    {
      value: "medium",
      name: "Moyen",
      description:
        "Adapté pour un casque, des bottes d'équitation ou un tapis de selle.",
    },
    {
      value: "large",
      name: "Grand",
      description:
        "Convient pour des articles plus volumineux comme une selle ou un tapis de selle.",
    },
    {
      value: "very_large",
      name: "Très grand",
      description:
        "Adapté pour des articles de grande taille ou les commandes de plusieurs articles volumineux.",
    },
  ];

  const handleCheckboxChange = (e) => {
    const shipping = e.target.value;
    setProduct((prev) => ({ ...prev, shipping: shipping }));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-center">
      <h3 className="font-mcqueen font-semibold w-[200px] my-auto mb-3 lg:mb-0">
        Livraison* :
      </h3>
      <Dropdown
        title="Sélectionner une taille de colis"
        className="w-full max-w-[700px]"
        isBlack
        isActive={product.shipping !== ""}
      >
        <div className="flex flex-col gap-y-4 py-4 max-h-96 overflow-y-scroll pe-3">
          {shippings.map((shipping, index) => {
            const { value, name, description } = shipping;
            return (
              <label
                key={index}
                className="flex justify-between items-center cursor-pointer font-semibold"
              >
                <div className="">
                  <p className="text-lg font-bold">{name}</p>
                  <p className="text-sm font-medium">{description}</p>
                </div>
                <Radio
                  className="ml-10"
                  value={value}
                  checked={product.shipping === value}
                  onChange={handleCheckboxChange}
                />
              </label>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
}
