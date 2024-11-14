import { useIsClickOutsideElement } from "@/utils/hooks";
import { useEffect, useRef, useState } from "react";
import CityIcon from "@/assets/icons/CityIcon";
import ModifyIcon from "@/assets/icons/ModifyIcon";

export default function Dropdown({
  title,
  children,
  className,
  isActive,
  isBlack,
  isCitySelect,
  onSelect,
}) {
  const panelRef = useRef();
  const buttonRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isClickOutside, setIsClickOutside] = useIsClickOutsideElement(
    panelRef,
    buttonRef
  );

  useEffect(() => {
    if (isClickOutside) {
      setIsOpen(false);
      setIsClickOutside(false);
    }
  }, [isClickOutside, setIsClickOutside]);

  useEffect(() => {
    setIsOpen(false);
    setIsClickOutside(false);
  }, [onSelect]);

  function handleClick() {
    setIsOpen(!isOpen);
    setIsClickOutside(false);
  }

  const handleStyle = () => {
    if (isActive) {
      return "border-light-green text-light-green bg-lighter-green hover:bg-dark-green hover:text-white hover:border-white transition duration-400";
    }
    if (isBlack) {
      return "text-black border-black hover:bg-black hover:text-white hover:border-white transition duration-400";
    } else {
      return "text-medium-grey border-medium-grey hover:bg-medium-grey hover:text-white hover:border-white transition duration-400";
    }
  };

  return (
    <div className={`relative lg:static ${className}`} ref={panelRef}>
      <button
        type="button"
        onClick={handleClick}
        className={`group flex items-center justify-between border px-5 py-2 rounded-xl font-mcqueen font-semibold ${handleStyle()}
        ${className}`}
      >
        <div className="flex items-center">
          {isCitySelect && (
            <CityIcon className="w-5 h-5 stroke-current fill-none mr-3" />
          )}
          {title}
        </div>
        {isCitySelect ? (
          <ModifyIcon className="w-9 h-9" />
        ) : (
          <svg
            className={`ml-2 ${
              isBlack
                ? "stroke-black group-hover:stroke-white transition duration-400"
                : isActive
                  ? " stroke-light-green"
                  : "stroke-medium-grey group-hover:stroke-white transition duration-400"
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
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute bg-light-grey border ${
            isBlack ? "border-black" : "border-light-green"
          } rounded-xl px-5 mt-2 z-30 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
