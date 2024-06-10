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
        <div ref={modalRef} className="bg-white p-8 rounded-lg">
          <div className="h-6 w-6 cursor-pointer" onClick={onClose}>
            <Image src={closeButton} alt="close" />
          </div>
          <h1 className="mb-4">Faire une offre</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="price">
                Votre offre
              </label>
              <input id="price" type="number" required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit">Faire une offre</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
