export default function ActiveFilterBtn({ filterName, onRemoveFilter }) {
  return (
    <div>
      {filterName}
      <button onClick={() => onRemoveFilter(filterName)}>X</button>
    </div>
  );
}
