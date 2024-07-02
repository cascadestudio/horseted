import Link from "next/link";

export default function Button({
  children,
  variant,
  className,
  type,
  href,
  onClick,
}) {
  const style = `${className} flex items-center w-fit font-mcqueen font-semibold rounded-xl h-11 px-7 ${
    variant === "white"
      ? "bg-white text-light-green border border-light-green"
      : variant === "black"
      ? "bg-transparent text-black border border-black"
      : variant === "transparent-green"
      ? "bg-transparent text-light-green border border-light-green"
      : variant === "transparent-red"
      ? "bg-transparent text-red border border-red"
      : "bg-light-green text-white"
  }`;

  if (href) {
    return (
      <Link href={href} className={style}>
        {children}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} type={type} className={style}>
        {children}
      </button>
    );
  }
}
