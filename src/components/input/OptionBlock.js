const OptionBlock = ({ children, defaultValue, checked, onChange, key }) => {
  return (
    <label
      key={key}
      className="flex items-center justify-between p-5 border border-darker-grey rounded-lg mb-5 bg-light-grey cursor-pointer"
    >
      <div>{children}</div>
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
