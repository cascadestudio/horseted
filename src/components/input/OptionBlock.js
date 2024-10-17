const OptionBlock = ({
  children,
  defaultValue,
  checked,
  onChange,
  className,
  required,
}) => {
  return (
    <label
      className={`flex items-center justify-between py-3 px-5 border border-darker-grey rounded-lg mb-5 bg-light-grey cursor-pointer ${className}`}
    >
      <div>{children}</div>
      <span className="h-5 w-5 rounded-full border border-black flex items-center justify-center">
        {checked && (
          <span className="h-3 w-3 rounded-full bg-light-green"></span>
        )}
      </span>
      <input
        className="hidden"
        type="radio"
        defaultValue={defaultValue}
        checked={checked}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

export default OptionBlock;
