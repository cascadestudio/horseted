const OptionBlock = ({ children, defaultValue, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between py-3 px-5 border border-darker-grey rounded-lg mb-5 bg-light-grey cursor-pointer">
      <div>{children}</div>
      <span className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center">
        {checked && <span className="h-2 w-2 rounded-full bg-green-600"></span>}
      </span>
      <input
        className="w-5"
        type="radio"
        defaultValue={defaultValue}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

export default OptionBlock;
