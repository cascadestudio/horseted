import { useEffect, useState } from "react";

export function useIsClickOutsideElement(elementRef, buttonRef) {
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      const button = buttonRef.current;
      const element = elementRef.current;

      if (button && button.contains(e.target)) {
        setIsClickOutside(false);
        return;
      }

      if (element && !element.contains(e.target)) {
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
