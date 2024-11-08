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
      slug
    }`,
    { cache: "no-store" }
  );
  return (
    <div>
      <Sidebar categories={helpCategories} />
      <main>{children}</main>
    </div>
  );
}
