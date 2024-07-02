import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Link from "next/link";

export default function ProductCategories({ parentId }) {
  const [itemCategories, setItemCategories] = useState([]);

  useEffect(() => {
    const fetchItemCategories = async () => {
      const query = `/categories?parentId=${parentId}`;
      try {
        const data = await fetchHorseted(query);
        setItemCategories(data);
      } catch (error) {
        console.error(`Error fetching ${query}:`, error);
      }
    };

    fetchItemCategories();
  }, [parentId]);

  if (itemCategories.length > 0) {
    return (
      <div key={itemCategories} className="p-5">
        <ul>
          {itemCategories.map((category) => {
            const { name, id } = category;
            return (
              <li key={name} className="">
                <Link href={`/articles?categoryId=${id}&categoryName=${name}`}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
