import Dropdown from "@/components/Dropdown";
import Radio from "@/components/input/Radio";
import { useState } from "react";

export default function StateSelect({ onStateChange, activeState }) {
  const states = [
    {
      label: "Neuf avec emballage",
      param: "new_with_packaging",
      description:
        "Article neuf, jamais porté/utilisé avec étiquette ou dans son emballage d'origine.",
    },
    {
      label: "Neuf sans emballage",
      param: "new_without_packaging",
      description:
        "Article neuf, jamais porté/utilisé, sans étiquette ou emballage d'origine.",
    },
    {
      label: "Très bon etat",
      param: "perfect",
      description:
        "Un article très peu porté/utilisé qui peut avoir de légères imperfections, mais qui reste en très bon état. Précisez les imperfections dans la description du produit. ",
    },
    {
      label: "Bon etat",
      param: "very_good",
      description:
        "Un article porté/utilisé quelques fois, montre des imperfections et des signes d'usure. Précisez les imperfections dans la description du produit. ",
    },
    {
      label: "Mauvais etat",
      param: "bad",
      description:
        "Un article porté/utilisé plusieurs fois, montre des imperfections et des signes d'usure. Précisez les imperfections dans la description du produit.",
    },
  ];

  return (
    <Dropdown className="mr-5" title="État">
      <div className="flex flex-col gap-y-4">
        {states.map((state, index) => {
          const { label, param, description } = state;
          return (
            <label
              key={index}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              <div>
                {label}
                <p className="text-sm font-medium">{description}</p>
              </div>
              <Radio
                className="ml-10"
                value={param}
                checked={activeState === param}
                onChange={onStateChange}
              />
            </label>
          );
        })}
      </div>
    </Dropdown>
  );
}
