import { useEffect, useState } from "react";

// Click Outside Element
export function useIsClickOutsideElement(elementRef) {
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        setIsClickOutside(true);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
      setIsClickOutside(false);
      // document.body.style.overflow = "scroll";
    };
  }, []);

  return [isClickOutside, setIsClickOutside];
}
