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

export default async function HelpLayout({ children }) {
  const helpCategories = await client.fetch(
    `*[_type == "helpCategory"] | order(orderRank asc) {
      slug,
      title,
    }`,
    { cache: "no-store" }
  );
  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pb-16">
      <Sidebar categories={helpCategories} />
      <main>{children}</main>
    </div>
  );
}
