"use client";

import { useState } from "react";
import Image from "next/image";
import DropdownArrow from "@/assets/icons/DropdownArrow.svg";

export default function PersonalizationSettings() {
  // TODO: quand Jojo aura fait le back
  return (
    <div className="lg:pt-10">
      <Dropdown
        label="Pointure"
        id="pointure"
        name="pointure"
        options={options}
        placeholder="Sélectionner une ou plusieurs pointures"
      />
      <Dropdown
        label="Genre"
        id="genre"
        name="genre"
        options={options}
        placeholder="Sélectionner un genre"
      />
      <Dropdown
        label="Tailles"
        id="tailles"
        name="tailles"
        options={options}
        placeholder="Sélectionner une taille"
      />
      <Dropdown
        label="Taille du cheval"
        id="tailles-du-cheval"
        name="tailles-du-cheval"
        options={options}
        placeholder="Sélectionner la taille du cheval"
      />
      <Dropdown
        label="Taille de casque"
        id="tailles-de-casque"
        name="tailles-de-casque"
        options={options}
        placeholder="Sélectionner une taille de casque"
      />
      <Dropdown
        label="Marque préférés"
        id="marques-preferees"
        name="marques-preferees"
        options={options}
        placeholder="Sélectionner vos marques préférées"
      />
    </div>
  );
}

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

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
