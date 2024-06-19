import Button from "@/components/Button";
import { useIsClickOutsideElement } from "@/libs/hooks";
import { useRef, useState, useEffect } from "react";
import CloseButton from "@/assets/icons/CloseButton";

export default function OfferModal({ price, onClose }) {
  const modalRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(modalRef);
  const [showAlert, setShowAlert] = useState(false);

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
    const number = parseFloat(e.target.offer.value);
    if (number > price) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      // TODO : Click on "Faire une offre" => POST /orders?price
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          ref={modalRef}
          className="bg-light-grey py-9 px-8 rounded-[20px] max-w-[540px] mx-5"
        >
          <div className="grid grid-cols-[1fr_auto_1fr] border-b border-black pb-6 mb-11">
            <h1 className="font-mcqueen col-start-2 font-bold text-[22px] lg:text-[28px] lg:leading-[48px]">
              Faire une offre
            </h1>
            <div
              className="col-start-3 cursor-pointer justify-self-end self-center"
              onClick={onClose}
            >
              <CloseButton className="h-7 w-7" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="lg:px-16 mb-9">
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
                    step="0.01"
                    name="offer"
                    id="offer"
                    placeholder={price}
                    className="border-none font-poppins text-[24px] leading-[48px] pb-0"
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
        {showAlert && (
          <div className="bg-light-grey text-red mx-5 px-5 py-4 rounded-[20px] absolute bottom-5 lg:bottom-20 flex gap-8 items-center">
            <span className="text-xl lg:text-[36px] lg:leading-[48px] font-bold font-mcqueen text-center rounded-full aspect-square h-6 w-6 lg:h-[54px] lg:w-[54px] bg-red bg-opacity-10 border border-red flex items-center justify-center">
              !
            </span>
            <p className="text-center font-bold">
              Vous ne pouvez pas faire une offre supérieure au montant de
              l’article
            </p>
          </div>
        )}
      </div>
    </>
  );
}
