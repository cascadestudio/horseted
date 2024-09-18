export default function ChevronDown({ className }) {
  return (
    <svg
      className={`${className} fill-current`}
      width="13"
      height="9"
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5L6.5 7.5L12 1.5"
        className="group-hover:stroke-white transition duration-400"
        stroke="#4D7A4C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
