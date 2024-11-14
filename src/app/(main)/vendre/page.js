import { getAllCategories } from "@/fetch/categories";
import ClientSellPage from "./ClientSellPage";

export const metadata = {
  title: "Vendre un article | Horseted",
  description:
    "Vendez vos articles d'équitation en toute simplicité avec Horseted.",
  openGraph: {
    title: "Vendre un article | Horseted",
    description:
      "Vendez vos articles d'équitation en toute simplicité avec Horseted.",
  },
};

export default async function ServerSellPage() {
  const categories = await getAllCategories();

  return <ClientSellPage categories={categories} />;
}
