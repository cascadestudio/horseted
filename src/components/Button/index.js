"use client";

import Link from "next/link";
import SignInModal from "../SignInModal";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function Button({
  children,
  variant,
  className,
  type,
  href,
  onClick,
  withAuth,
  noStyle,
}) {
  const baseStyles = `${className} flex justify-center items-center text-center whitespace-nowrap font-mcqueen font-semibold rounded-xl h-11 px-7`;

  const variantStyles = {
    red: "bg-red text-white",
    white: "bg-white text-light-green border border-light-green",
    "transparent-black": "bg-transparent text-black border border-black",
    "transparent-green":
      "bg-transparent text-light-green border border-light-green",
    "transparent-red": "bg-transparent text-red border border-red",
    "transparent-grey":
      "bg-transparent text-medium-grey border border-medium-grey hover:bg-lighter-green hover:text-light-green hover:border-light-green",
  };

  const style = `${baseStyles} ${variantStyles[variant] || "bg-light-green text-white"}`;

  const [isSignInModal, setIsSignInModal] = useState(false);
  const { user } = useAuthContext();

  const handleClick = () => {
    if (withAuth && !user) {
      setIsSignInModal(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {href && (user || !withAuth) ? (
        <Link href={href} className={!noStyle ? style : ""}>
          {children}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          type={type}
          className={!noStyle ? style : ""}
        >
          {children}
        </button>
      )}
      {isSignInModal && <SignInModal setIsSignInModal={setIsSignInModal} />}
    </>
  );
}
