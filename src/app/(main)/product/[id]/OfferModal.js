import Button from "@/components/Button";
import { useIsClickOutsideElement } from "@/libs/hooks";
import { useRef, useEffect } from "react";
import Image from "next/image";
import closeButton from "@/assets/icons/closeButton.svg";

export default function OfferModal({ onClose }) {
  const modalRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(modalRef);

  useEffect(() => {
    if (isClickOutside) {
      onClose();
      setIsClickOutside(false);
    }
  }, [isClickOutside, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO : Click on "Faire une offre" => POST /orders?price
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          ref={modalRef}
          className="bg-white py-9 px-8 rounded-[20px] w-[540px]"
        >
          <div className="grid grid-cols-[1fr_auto_1fr] border-b border-black pb-6 mb-11">
            <h1 className="font-mcqueen col-start-2 font-bold text-[28px] leading-[48px]">
              Faire une offre
            </h1>
            <div
              className="col-start-3 cursor-pointer justify-self-end self-center"
              onClick={onClose}
            >
              <Image className="h-7 w-7" src={closeButton} alt="close" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="px-16 mb-9">
            <div className="mb-7">
              <label
                className="block font-mcqueen font-semibold mb-2"
                htmlFor="price"
              >
                Votre offre :
                <div className="flex items-center border-b border-black">
                  <input
                    required
                    type="number"
                    name="offer"
                    id="offer"
                    placeholder="55.90"
                    className="bg-transparent w-full placeholder:font-normal placeholder:font-poppins placeholder:text-[24px] placeholder:leading-[48px] placeholder:text-grey pt-1"
                  />
                  <span className="text-[24px] leading-[48px] font-semibold mr-2">
                    €
                  </span>
                </div>
              </label>
            </div>
            <Button
              className="w-full flex justify-center text-xl h-12"
              type="submit"
            >
              Faire une offre
            </Button>
          </form>
          <p className="text-center">
            L’offre sera envoyée au vendeur, qui se réserve le droit de
            l’accepter, de la refuser ou de faire une contre-offre
          </p>
        </div>
      </div>
    </>
  );
}
