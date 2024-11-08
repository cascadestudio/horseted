import ChevronRight from "@/assets/icons/ChevronRight";
import Link from "next/link";

export default function ArticlesList({ articles, categorySlug }) {
  return (
    <div className="col-span-3 lg:col-span-2 pt-5 lg:pt-[134px]">
      <ul>
        {articles.map((article, index) => (
          <li key={index} className="font-medium border-b border-lighter-grey">
            <Link
              href={`/aide/${categorySlug}/${article.slug.current}`}
              className="w-full py-4 px-6 flex items-center justify-between hover:bg-pale-grey"
            >
              {article.title}
              <ChevronRight />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
