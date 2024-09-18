import { useRef, useState } from "react";
import Image from "next/image";
import Alert from "@/components/Alert";

export default function ProductMedia({ setImgFiles, handleFormChange }) {
  const [imageSrcs, setImageSrcs] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const fileInputRef = useRef(null);

  const handleMediaChange = (e) => {
    handleFormChange(e);
    const files = Array.from(e.target.files);

    const isFileLimit = imageSrcs.length + files.length > 10;

    if (isFileLimit) return setIsAlert(true);

    if (files) {
      const fileReaders = [];

      files.forEach((file) => {
        setImgFiles((prev) => [...prev, file]);

        const reader = new FileReader();
        fileReaders.push(reader);
        reader.onloadend = () => {
          setImageSrcs((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImageClick = (index) => {
    setImgFiles((prev) => prev.filter((_, i) => i !== index));
    setImageSrcs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    // TODO redo responsive
    <>
      <div className="hidden w-full lg:flex flex-col lg:flex-row lg:justify-center">
        <h3 className="font-mcqueen font-semibold w-[200px]">Photos* :</h3>
        <div className="flex w-[700px] justify-center">
          <div>
            {imageSrcs.length > 0 &&
              imageSrcs.map((imageSrc, index) => (
                <div
                  key={index}
                  className="relative inline-block ml-3 w-fit self-end place-self-end"
                >
                  <Image
                    src={imageSrc}
                    className="object-cover rounded w-[115px] h-[140px]"
                    width={100}
                    height={100}
                    alt="Avatar"
                  />
                  <button
                    onClick={() => handleRemoveImageClick(index)}
                    className="absolute top-[-10px] right-[-10px] bg-white text-black rounded-full w-5 h-5 flex items-center justify-center border border-black pb-1"
                  >
                    x
                  </button>
                </div>
              ))}
          </div>
          <label
            className={`${
              imageSrcs.length > 0
                ? "p-0 ml-6 border-none"
                : "w-full border border-light-green border-dashed py-5"
            } text-light-green flex flex-col items-center justify-center rounded-xl bg-white cursor-pointer min-h-[122px]`}
          >
            {imageSrcs.length < 10 && (
              <span className="w-10 h-10 flex items-center justify-center bg-lighter-green border border-light-green rounded-full text-4xl text-light-green">
                +
              </span>
            )}
            {!imageSrcs.length > 0 && (
              <>
                <p className="font-bold font-mcqueen text-center">
                  Ajouter des photos
                </p>
                <p className="font-medium text-sm text-black">
                  Ajoutez jusqu’à 10 photos
                </p>
              </>
            )}
            <input
              ref={fileInputRef} // Attach the ref to the input
              onChange={handleMediaChange}
              type="file"
              name="photos"
              className="hidden"
              accept="image/png, image/jpeg"
              multiple
              max={10}
            />
          </label>
        </div>
      </div>
      <div className=" w-full flex flex-col lg:hidden lg:flex-row lg:justify-center">
        <h3 className="font-mcqueen font-semibold w-[200px]">Photos* :</h3>
        <div className="flex flex-wrap gap-y-3 w-full lg:flex-row lg:justify-center">
          {imageSrcs.length > 0 &&
            imageSrcs.map((imageSrc, index) => (
              <div key={index} className="relative inline-block ml-3 w-fit">
                <Image
                  src={imageSrc}
                  className="object-cover rounded w-[115px] h-[140px]"
                  width={100}
                  height={100}
                  alt="Avatar"
                />
                <button
                  onClick={() => handleRemoveImageClick(index)}
                  className="absolute top-[-10px] right-[-10px] bg-white text-black rounded-full w-5 h-5 flex items-center justify-center border border-black pb-1"
                >
                  x
                </button>
              </div>
            ))}
          <label
            className={`${
              imageSrcs.length > 0
                ? "w-fit p-0 ml-6 border-none"
                : "max-w-[700px] w-full border border-light-green border-dashed py-5"
            } text-light-green flex flex-col items-center justify-center rounded-xl bg-white cursor-pointer min-h-[122px]`}
          >
            {imageSrcs.length < 10 && (
              <span className="w-10 h-10 flex items-center justify-center bg-lighter-green border border-light-green rounded-full text-4xl text-light-green">
                +
              </span>
            )}
            {!imageSrcs.length > 0 && (
              <>
                <p className="font-bold font-mcqueen text-center">
                  Ajouter des photos
                </p>
                <p className="font-medium text-sm text-black">
                  Ajoutez jusqu’à 10 photos
                </p>
              </>
            )}
            <input
              ref={fileInputRef} // Attach the ref to the input
              onChange={handleMediaChange}
              type="file"
              name="photos"
              className="hidden"
              accept="image/png, image/jpeg"
              multiple
              max={10}
            />
          </label>
        </div>
      </div>
      {isAlert && (
        <Alert type="info">Vous avez dépassé la limite de 10 photos</Alert>
      )}
    </>
  );
}
