import { useState } from "react";

export default function Dropdown({ title, children, className }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsActive(!isActive)}
        className="flex items-center border border-light-green px-5 py-2 rounded-xl bg-lighter-green text-light-green font-mcqueen font-semibold"
      >
        {title}
        <svg
          className="ml-2"
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.00003 1.5L5.00002 5.49998L9 1.5"
            stroke="#4D7A4C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isActive && (
        <div className="absolute bg-light-grey border border-light-green rounded-xl p-5 mt-2 max-w-96 ">
          {children}
        </div>
      )}
    </div>
  );
}
