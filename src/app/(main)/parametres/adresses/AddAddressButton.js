export default function AddAddressButton({ onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="flex items-center px-5 mt-4 bg-light-grey w-full col-start-1"
    >
      <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
        +
      </span>
      <span className="text-lg font-medium">Ajouter une adresse</span>
    </button>
  );
}
