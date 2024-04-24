export default function Button({ children, variant, className }) {
  return (
    <button
      className={`${className} rounded-xl h-11 px-7 ${
        variant === "white"
          ? "bg-white text-light-green border border-light-green"
          : "bg-light-green text-white"
      }`}
    >
      {children}
    </button>
  );
}
