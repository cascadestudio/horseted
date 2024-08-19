import Checkbox from "@/components/input/Checkbox";
import UploadIcon from "@/assets/icons/UploadIcon";
import { useState } from "react";

const HandleFiles = ({ setFiles }) => {
  const [isConsent, setIsConsent] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [name]: file }));
    }
  };

  return (
    <div className="col-span-2 lg:col-span-1">
      <h2 className="font-mcqueen text-[24px] font-bold">
        Vérification de l’identité
      </h2>
      <h3 className="font-mcqueen font-semibold mb-2">Document d’identité :</h3>
      <label className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
        <UploadIcon />
        <p className="text-sm font-semibold uppercase text-center">Passeport</p>
        <input
          onChange={handleFileChange}
          type="file"
          name="frontDocument"
          className="hidden"
        />
      </label>
      <p className="text-center uppercase text-xl">ou</p>
      <p className="text-center uppercase text-light-green mb-2">
        Carte d'identité
      </p>
      <div className="flex gap-8">
        <label className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
          <UploadIcon />
          <p className="text-sm font-semibold uppercase text-center">Recto</p>
          <input
            onChange={handleFileChange}
            type="file"
            name="frontAdditionalDocument"
            className="hidden"
          />
        </label>
        <label className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
          <UploadIcon />
          <p className="text-sm font-semibold uppercase text-center">Verso</p>
          <input
            onChange={handleFileChange}
            type="file"
            name="backAdditionalDocument"
            className="hidden"
          />
        </label>
      </div>
      <label className="flex items-start mt-12 mb-7">
        <Checkbox
          value={isConsent}
          checked={isConsent}
          onChange={() => setIsConsent(!isConsent)}
          required
        />
        <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
          J’accepte que mon identité soit vérifiée par Horseted
        </span>
      </label>
    </div>
  );
};

export default HandleFiles;
