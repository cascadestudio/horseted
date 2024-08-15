"use client";

import { useState } from "react";
import Dropdown from "./Dropdown";

export default function Customization() {
  const [formData, setFormData] = useState({
    sizes: [],
    categoryId: 0,
    terms: "",
    brands: [],
    materials: [],
    states: [],
    shippings: [],
    colors: [],
  });

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

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
        options={[
          { value: "female", label: "femme" },
          { value: "male", label: "homme" },
          { value: "other", label: "autre" },
        ]}
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
