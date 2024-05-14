export default function RightArrow({ className, color }) {
  return (
    <svg
      className={className}
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 5H11.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.50024 8.99997L11.5002 4.99998L7.50024 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
