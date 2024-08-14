import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Link from "next/link";

export default function ProductCategories({ parentId, setIsOpen }) {
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
      <div key={itemCategories} className="px-5 py-2">
        <ul className={itemCategories.length > 12 ? `columns-2` : ``}>
          {itemCategories.map((category) => {
            const { name, id } = category;
            return (
              <li key={name} className="">
                <Link
                  onClick={() => setIsOpen(false)}
                  className="whitespace-nowrap font-medium p-2 block"
                  href={`/articles?categoryId=${id}&categoryName=${name}`}
                >
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
