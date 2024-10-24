export const TextInput = ({
  label,
  name,
  value,
  onChange,
  list,
  required,
  placeholder,
  disabled,
  className,
  type = "text",
  hideLabel = false,
  minLength,
}) => (
  <label htmlFor={name} className={`w-full ${className}`}>
    {!hideLabel && (
      <p className="label font-mcqueen font-semibold">{label} :</p>
    )}
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        name={name}
        id={name}
        required={required}
        disabled={disabled}
        rows="4"
        className={`focus:outline-none bg-transparent border-b border-black rounded-none appearance-none w-full text-[14px] placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2 resize-none overflow-hidden break-words whitespace-pre-wrap ${
          disabled && "cursor-not-allowed"
        }`}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        list={list}
        name={name}
        id={name}
        required={required}
        disabled={disabled}
        className={`${className} bg-transparent border-b border-black rounded-none appearance-none w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2 ${
          disabled && "cursor-not-allowed"
        }`}
        minLength={minLength}
      />
    )}
  </label>
);
