export const TextInput = ({
  label,
  name,
  value,
  onChange,
  list,
  required,
  placeholder,
  disabled,
}) => (
  <label htmlFor={name} className="w-full mx-2">
    <p className="label font-mcqueen font-semibold">{label} :</p>
    <input
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      list={list}
      name={name}
      id={name}
      required={required}
      disabled={disabled}
      className={`bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2 ${
        disabled && "cursor-not-allowed"
      }`}
    />
  </label>
);
