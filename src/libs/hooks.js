import { useEffect, useState } from "react";

// Fetch Categories
export function useFetchCategories(parentId) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getCategories?query=${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setIsLoading(false);
      });
  }, [parentId]);

  return [categories, isLoading];
}

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
