import Link from "next/link";
import { client } from "../../../../../sanity/lib/client";

export default async function CategoryList({ activeSlug }) {
  const helpCategories = await client.fetch(
    `*[_type == "helpCategory" && count(*[_type == "helpArticle" && references(^._id)]) > 0] | order(orderRank asc) {
      title,
      slug
    }`
  );

  return (
    <aside className="bg-light-grey flex flex-col border border-lighter-grey">
      {helpCategories.map((category, index) => {
        const isActive = activeSlug === category.slug.current;

        return (
          <Link
            key={index}
            href={`/aide/${category.slug.current}`}
            className={`cursor-pointer border-lighter-grey py-5 px-9 hover:bg-pale-grey ${
              isActive ? " font-extrabold" : "font-medium"
            }`}
          >
            {category.title}
          </Link>
        );
      })}
    </aside>
  );
}
