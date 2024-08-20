export default function Toggle({ label, name, checked, handleChange }) {
  return (
    <div className="flex justify-between p-5 border-b border-lighter-grey">
      <p className="font-semibold">{label}</p>
      <label htmlFor={name} className="flex items-center gap-2 cursor-pointer">
        <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in ml-2">
          <input
            checked={checked}
            onChange={handleChange}
            name={name}
            id={name}
            type="checkbox"
            className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
          />
          <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
        </div>
      </label>
    </div>
  );
}
