import Checkbox from "@/components/input/Checkbox";
import UploadIcon from "@/assets/icons/UploadIcon";
import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { objectToFormData } from "@/utils/objectToFormData";
import Image from "next/image";

const HandleFiles = ({ setStripeAccountForm, accessToken }) => {
  const [isConsent, setIsConsent] = useState(false);
  const [imageSrcs, setImageSrcs] = useState({
    frontDocument: null,
    backDocument: null,
  });
  const [files, setFiles] = useState({
    frontDocument: null,
    backDocument: null,
    // frontAdditionalDocument: null,
    // backAdditionalDocument: null, // la maquette fait galérer, occupe toi juste du recto / verso et oublie le passeport pour l’instant. je vais essayer de faire changer ça à alex
  });

  useEffect(() => {
    if (files.frontDocument || files.backDocument) {
      postFiles();
    }
  }, [files]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [name]: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrcs((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const postFiles = async () => {
    const formData = objectToFormData(files);
    const filesIds = await fetchHorseted(
      "/users/me/files",
      accessToken,
      "POST",
      formData,
      false,
      true
    );
    setStripeAccountForm((prevState) => ({
      ...prevState,
      individual: {
        ...prevState.individual,
        verification: {
          ...prevState.individual.verification,
          document: {
            ...prevState.individual.verification.document,
            front: filesIds.frontDocument,
            back: filesIds.backDocument,
          },
        },
      },
    }));
  };

  return (
    <div className="col-span-2 lg:col-span-1">
      <h2 className="font-mcqueen text-[24px] font-bold">
        Vérification de l’identité
      </h2>
      <h3 className="font-mcqueen font-semibold mb-2">Document d’identité :</h3>
      {/* <label className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
        <UploadIcon />
        <p className="text-sm font-semibold uppercase text-center">Passeport</p>
        <input
          onChange={handleFileChange}
          type="file"
          name="frontDocument"
          className="hidden"
        />
      </label> */}
      {/* <p className="text-center uppercase text-xl">ou</p> */}
      <p className="text-center uppercase text-light-green mb-2">
        Carte d'identité
      </p>
      <div className="flex gap-8">
        <label className="h-[130px] text-light-green  w-full border border-light-green border-dashed rounded-xl bg-white mb-4 cursor-pointer">
          {imageSrcs.frontDocument ? (
            <Image
              src={imageSrcs.frontDocument}
              className="w-full h-full object-cover rounded-xl"
              width={100}
              height={100}
              alt="Avatar"
            />
          ) : (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <UploadIcon />
              <p className="text-sm font-semibold uppercase text-center">
                Recto
              </p>
            </div>
          )}
          <input
            onChange={handleFileChange}
            type="file"
            name="frontDocument"
            className="hidden"
            accept="image/png, image/jpeg"
          />
        </label>
        <label className="h-[130px] text-light-green  w-full border border-light-green border-dashed rounded-xl bg-white mb-4 cursor-pointer">
          {imageSrcs.backDocument ? (
            <Image
              src={imageSrcs.backDocument}
              className="w-full h-full object-cover rounded-xl"
              width={100}
              height={100}
              alt="Avatar"
            />
          ) : (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <UploadIcon />
              <p className="text-sm font-semibold uppercase text-center">
                Verso
              </p>
            </div>
          )}
          <input
            onChange={handleFileChange}
            type="file"
            name="backDocument"
            className="hidden"
            accept="image/png, image/jpeg"
          />
        </label>
      </div>
      <label className="flex items-start mt-12 mb-7">
        <Checkbox
          value={isConsent}
          checked={isConsent}
          onChange={() => setIsConsent(!isConsent)}
          required={true}
        />
        <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
          J’accepte que mon identité soit vérifiée par Horseted
        </span>
      </label>
    </div>
  );
};

export default HandleFiles;
