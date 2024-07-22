export default function CityIcon({ className }) {
  return (
    <svg
      className={`${className} fill-current`}
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 16C8.5 16 13 12.5 13 7.66667C13 4 10.5 1 7 1C3.5 1 1 4 1 7.66667C1 12.5 5.5 16 7 16Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7.5C7.27614 7.5 7.5 7.27614 7.5 7C7.5 6.72386 7.27614 6.5 7 6.5C6.72386 6.5 6.5 6.72386 6.5 7C6.5 7.27614 6.72386 7.5 7 7.5Z"
        fill="black"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
