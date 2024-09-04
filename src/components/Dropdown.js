import { useIsClickOutsideElement } from "@/utils/hooks";
import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  title,
  children,
  className,
  isActive,
  isBlack,
}) {
  const panelRef = useRef();
  const buttonRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isClickOutside, setIsClickOutside] = useIsClickOutsideElement(
    panelRef,
    buttonRef
  );

  // console.log("isActive =>", isActive);

  useEffect(() => {
    if (isClickOutside) {
      setIsOpen(false);
      setIsClickOutside(false);
    }
  }, [isClickOutside, setIsClickOutside]);

  function handleClick() {
    setIsOpen(!isOpen);
    setIsClickOutside(false);
  }

  const handleStyle = () => {
    if (isActive) {
      return "border-light-green text-light-green bg-lighter-green";
    }
    if (isBlack) {
      return "text-black border-black";
    } else {
      return "text-medium-grey border-medium-grey ";
    }
  };

  return (
    <div className={`relative lg:static ${className}`} ref={panelRef}>
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-between border px-5 py-2 rounded-xl font-mcqueen font-semibold ${handleStyle()}
        ${className}`}
      >
        {title}
        <svg
          className={`ml-2 ${
            isBlack
              ? "stroke-black"
              : isActive
                ? " stroke-light-green"
                : "stroke-medium-grey"
          }`}
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.00003 1.5L5.00002 5.49998L9 1.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className={`absolute bg-light-grey border ${
            isBlack ? "border-black" : "border-light-green"
          } rounded-xl px-5 mt-2 z-10 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
