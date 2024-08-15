import Image from "next/image";
import DropdownArrow from "@/assets/icons/DropdownArrow.svg";
import { useState } from "react";

const Dropdown = ({ label, id, name, options, placeholder }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="grid lg:grid-cols-[auto,1fr] lg:gap-10 mt-5 items-center">
      <label htmlFor={id} className="font-mcqueen font-semibold w-32">
        {label}
      </label>
      <div className="relative mt-2 lg:mt-0 font-mcqueen">
        <select
          id={id}
          name={name}
          value={selectedValue}
          onChange={handleChange}
          className="appearance-none py-2 px-5 bg-transparent border border-black rounded-xl w-full"
          placeholder={placeholder}
        >
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
          <Image src={DropdownArrow} alt="DropdownArrow" />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
