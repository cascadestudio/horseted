export default function Button({ children, variant, className }) {
  return (
    <button
      className={`${className} font-mcqueen font-semibold rounded-xl h-11 px-7 ${
        variant === "white"
          ? "bg-white text-dark-green border border-dark-green"
          : "bg-dark-green text-white"
      }`}
    >
      {children}
    </button>
  );
}
