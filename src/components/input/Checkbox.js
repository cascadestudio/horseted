import TickIcon from "@/assets/icons/TickIcon";

export default function Checkbox({
  checked,
  onChange,
  className = "",
  value,
  disabled,
  name,
  required,
}) {
  return (
    <div className={`w-4 h-4 lg:w-5 lg:h-5 relative ${className}`}>
      <input
        required={required}
        name={name}
        value={value || false}
        type="checkbox"
        size="10"
        checked={checked || false}
        onChange={onChange}
        disabled={disabled}
        className={`appearance-none cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-black rounded bg-white checked:bg-light-green checked:border-transparent ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
      />
      {checked && (
        <TickIcon
          width={10}
          height={7}
          className="absolute w-auto inset-0 mx-auto mt-[6px] cursor-pointer"
        />
      )}
    </div>
  );
}
