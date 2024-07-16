import TickIcon from "@/assets/icons/TickIcon";

export default function Checkbox({ checked, onChange, className }) {
  return (
    <div className={`w-4 h-4 lg:w-5 lg:h-5 relative ${className}`}>
      <input
        type="checkbox"
        size="10"
        checked={checked}
        onChange={onChange}
        className="appearance-none cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-black rounded bg-white checked:bg-light-green checked:border-transparent"
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
