import { useEffect, useState } from "react";

// Fetch Categories
export function useFetchCategories(parentId) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/categories?parentId=${parentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      });
  }, [parentId]);

  return [categories, isLoading];
}

// Fetch API
export function useFetchApi(query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}${query}`;

  useEffect(() => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setData(false);
      });
  }, [query]);

  return [data, isLoading];
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
