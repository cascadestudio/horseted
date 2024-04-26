import { useEffect, useState } from "react";

export function useFetchCategories(parentId) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api?query=${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        // console.log(data.data);
        setIsLoading(false);
      });
  }, []);

  return [categories, isLoading];
}
