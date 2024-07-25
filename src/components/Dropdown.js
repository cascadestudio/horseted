import { useIsClickOutsideElement } from "@/utils/hooks";
import { useEffect, useRef, useState } from "react";

export default function Dropdown({ title, children, className, isActive }) {
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

  function handleClick() {
    setIsOpen(!isOpen);
    setIsClickOutside(false);
  }

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`flex items-center border px-5 py-2 rounded-xl font-mcqueen font-semibold ${
          isActive
            ? "border-light-green text-light-green bg-lighter-green"
            : "text-medium-grey border-medium-grey"
        }`}
      >
        {title}
        <svg
          className={`ml-2 ${
            isActive ? " stroke-light-green" : "stroke-medium-grey"
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
          ref={panelRef}
          className="absolute bg-light-grey border border-light-green rounded-xl p-5 mt-2 z-10"
        >
          {children}
        </div>
      )}
    </div>
  );
}
