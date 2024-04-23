export default function Button({ children, variant }) {
  return (
    <button
      className={`rounded-xl h-11 px-7 ${
        variant === "white"
          ? "bg-white text-principale-800 border border-principale-800"
          : "bg-principale-800 text-white"
      }`}
    >
      {children}
    </button>
  );
}
