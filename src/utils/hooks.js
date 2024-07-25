import { useEffect, useState } from "react";

export function useIsClickOutsideElement(elementRef, buttonRef) {
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (buttonRef?.current && buttonRef?.current.contains(e.target)) {
        setIsClickOutside(false);
        return;
      }
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        setIsClickOutside(true);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
      setIsClickOutside(false);
    };
  }, [elementRef, buttonRef]);

  return [isClickOutside, setIsClickOutside];
}
