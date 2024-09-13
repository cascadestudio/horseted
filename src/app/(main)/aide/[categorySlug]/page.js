import { groq } from "next-sanity";
import { client } from "../../../../../sanity/lib/client";
import ChevronRight from "@/assets/icons/ChevronRight";

// Query to fetch articles for the selected category
const categoryQuery = groq`
  *[_type == "helpCategory" && slug.current == $categorySlug][0]{
    title,
    slug,
    "articles": *[_type == "helpArticle" && references(^._id)]{
      title,
      slug
    }
  }
`;

export default async function HelpCategoryPage({ params }) {
  const { categorySlug } = params;

  // Fetch the category and its articles using the slug
  const category = await client.fetch(categoryQuery, { categorySlug });

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      {category.articles.length > 0 ? (
        <ul>
          {category.articles.map((article, index) => (
            <li
              key={index}
              className="font-medium border-b border-lighter-grey"
            >
              <a
                href={`/aide/${category.slug.current}/${article.slug.current}`}
                className="w-full py-4 px-6 flex items-center justify-between hover:bg-pale-grey"
              >
                {article.title}
                <ChevronRight />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Pas d'article dans cette catégorie.</p>
      )}
    </div>
  );
}
