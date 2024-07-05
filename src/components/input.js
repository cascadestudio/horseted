export const TextInput = ({ label, name, value, onChange, list, required }) => (
  <label htmlFor={name}>
    <p className="label">{label} :</p>
    <input
      value={value || ""}
      onChange={onChange}
      list={list}
      name={name}
      id={name}
      required={required}
      className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
    />
  </label>
);