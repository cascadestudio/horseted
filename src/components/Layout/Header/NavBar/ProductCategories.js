import { useFetchCategories } from "@/libs/hooks";
import Link from "next/link";

export default function ProductCategories({ parentId }) {
  const [itemCategories] = useFetchCategories(parentId);

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
