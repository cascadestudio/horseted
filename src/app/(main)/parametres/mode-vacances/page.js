export default function VacationMode() {
  return (
    <div className="flex flex-col justify-center w-full lg:pt-14">
      <form className="w-full">
        <label htmlFor="vacationMode" className="flex items-center mt-3">
          <span className="font-semibold mr-3">Activer le mode vacances</span>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="vacationMode"
              // checked={vacationMode}
              // onChange={() => setShowCity(!vacationMode)}
              className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
            />
            <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
          </div>
        </label>
      </form>
      <p className="font-medium text-sm mt-4">
        Vous partez en vacances ? Activer le mode vacances pour désactiver
        provisoirement vos annonces.
      </p>
    </div>
  );
}
