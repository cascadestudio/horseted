import { useEffect, useState } from "react";

export function useFetchCategories(parentId) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api?query=${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, []);

  return [categories, setCategories];
}
