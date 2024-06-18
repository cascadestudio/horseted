export default function ActiveFilterBtn({ filterName, onRemoveFilter }) {
  return (
    <div>
      {filterName}
      <button onClick={() => onRemoveFilter()}>X</button>
    </div>
  );
}
