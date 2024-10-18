import ClientFavoritesPage from "./ClientFavoritesPage";

export async function generateMetadata() {
  const title = "Articles favoris | Horseted";
  const description =
    "Consultez vos articles favoris sauvegardés sur Horseted. Découvrez vos produits préférés et explorez de nouvelles offres.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function ServerFavoritesPage() {
  return <ClientFavoritesPage />;
}
