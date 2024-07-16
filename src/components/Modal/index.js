"use client";

import { useEffect, useRef } from "react";
import CloseButton from "@/assets/icons/CloseButton";
import Button from "@/components/Button";
import { useIsClickOutsideElement } from "@/utils/hooks";

export default function Modal({
  title,
  onClose,
  onSubmit,
  children,
  buttonText,
  className,
}) {
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
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-light-grey py-9 px-8 rounded-[20px] sm:w-[540px] mx-5"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] border-b border-black pb-6 mb-11">
          <h1 className="font-mcqueen col-start-2 font-bold text-[22px] lg:text-[28px] lg:leading-[48px]">
            {title}
          </h1>
          <div
            className="col-start-3 cursor-pointer justify-self-end self-center"
            onClick={onClose}
          >
            <CloseButton className="h-7 w-7" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className={"lg:px-16 mb-9 " + className}>
          {children}
          {buttonText && (
            <Button className="w-full text-xl h-12 mt-4" type="submit">
              {buttonText}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
