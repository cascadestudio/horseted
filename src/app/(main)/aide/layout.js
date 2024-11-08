import { client } from "../../../../sanity/lib/client";
import Sidebar from "./Sidebar";

export const metadata = {
  title: "Aide | Horseted",
  description: "Aide | Horseted",
  openGraph: {
    title: "Aide | Horseted",
    description: "Aide | Horseted",
  },
};

export default async function HelpLayout({ children, params }) {
  const { articleSlug } = params;

  const helpCategories = await client.fetch(
    `*[_type == "helpCategory"] | order(orderRank asc) {
      slug,
      title,
    }`,
    { cache: "no-store" }
  );

  let articleTitle = null;

  if (articleSlug) {
    // If on an article page, fetch the article title
    const article = await client.fetch(
      `*[_type == "helpArticle" && slug.current == $articleSlug][0] {
        title
      }`,
      { articleSlug },
      { cache: "no-store" }
    );

    if (article) {
      articleTitle = article.title;
    }
  }

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pb-16">
      <Sidebar categories={helpCategories} />
      <main className="col-span-3 lg:col-span-2">{children}</main>
    </div>
  );
}
