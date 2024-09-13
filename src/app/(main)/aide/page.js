import { redirect } from "next/navigation"; // Import redirect function
import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";

// Query to fetch all categories
const helpCategoriesQuery = groq`
  *[_type == "helpCategory"] | order(orderRank asc) {
    slug
  }
`;

export default async function HelpCenter() {
  // Fetch all categories
  const categories = await client.fetch(helpCategoriesQuery);

  // If no categories exist, return a 404 or error page (optional)
  if (!categories || categories.length === 0) {
    return <div>Aucune catégorie trouvée</div>;
  }

  // Get the first category's slug
  const firstCategorySlug = categories[0].slug.current;

  // Redirect to the first category's page
  redirect(`/aide/${firstCategorySlug}`);

  return null; // Since we're redirecting, no need to render anything
}
