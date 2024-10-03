import { redirect } from "next/navigation";
import { client } from "../../../../sanity/lib/client";

export async function generateMetadata() {
  return {
    title: `Aide | Application Horseted`,
    description: `Aide | Application Horseted`,
  };
}

export default async function AidePage() {
  const helpCategories = await client.fetch(
    `*[_type == "helpCategory"] | order(orderRank asc) {
      slug
    }`
  );

  if (helpCategories.length > 0) {
    const firstCategorySlug = helpCategories[0].slug.current;
    redirect(`/aide/${firstCategorySlug}`);
  }

  return null;
}
