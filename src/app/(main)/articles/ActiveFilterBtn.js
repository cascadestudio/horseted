import { stateTranslations } from "@/utils/translations";

export default function ActiveFilterBtn({ filterName, onRemoveFilter }) {
  const translatedFilterName = stateTranslations[filterName] || filterName;

  return (
    <button
      onClick={() => onRemoveFilter(filterName)}
      className="flex items-center rounded-full bg-pale-grey border-darker-grey border px-4 py-2"
    >
      <p className="text-darker-grey font-semibold mr-3">
        {translatedFilterName}
      </p>
      <img src="/icons/remove-filter.svg" alt="Enlever le filtre" />
    </button>
  );
}
