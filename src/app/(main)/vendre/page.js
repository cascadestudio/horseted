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

export default function ServerSellPage() {
  return <ClientSellPage />;
}
