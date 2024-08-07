import DeleteIcon from "@/assets/icons/DeleteIcon";
import ModifyIcon from "@/assets/icons/ModifyIcon";
import Radio from "@/components/input/Radio";

export default function page() {
  // Add dynamic addresses
  const addresses = [
    {
      id: 1,
      createdAt: new Date(),
      fullName: "John Doe",
      street: "18 avenue de la Paix",
      postalCode: "34000 ",
      city: "Montpellier",
      country: "US",
      additionalInfos: "",
      type: "delivery",
      latitude: 37.7749,
      longitude: -122.4194,
      isDefault: true,
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:pt-14 lg:grid-cols-2 lg:gap-x-14 gap-y-4 lg:gap-y-2">
      <h3 className="text-[24px] font-mcqueen font-bold mb-2 lg:col-start-1">
        Adresse de livraison
      </h3>
      {addresses.map((address) => (
        <div
          className="bg-white rounded-xl p-5 border border-lighter-grey lg:col-start-1 flex justify-between items-center"
          key={address.id}
        >
          <div className="text-sm">
            <p>{address.street}</p>
            <p>
              {address.postalCode} {address.city}
            </p>
            <p>{address.additionalInfos}</p>
          </div>
          <div className="flex gap-2">
            <button>
              <ModifyIcon className="w-9 h-9" />
            </button>
            <button>
              <DeleteIcon className="w-9 h-9 text-red" />
            </button>
          </div>
        </div>
      ))}
      <button className="flex items-center px-5 mt-4 bg-light-grey w-full col-start-1">
        <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
          +
        </span>
        <span className="text-lg font-medium">Ajouter une adresse</span>
      </button>
      <h3 className="text-[24px] font-mcqueen font-bold lg:col-start-2 lg:row-start-1">
        Adresse de facturation
      </h3>
      <div className="flex gap-2 items-start lg:col-start-2 lg:row-start-2">
        <Radio />
        <p className="font-semibold leading-5">
          Identique à l’adresse de livraison
        </p>
      </div>
    </div>
  );
}
