import { useEffect, useState } from "react";

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

export function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getProducts`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setIsLoading(false);
      });
  }, [parentId]);

  return [products, isLoading];
}
