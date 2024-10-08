import ClientContactPage from "./ClientContactPage";

export async function generateMetadata() {
  const title = "Contactez l'équipe Horseted | Horseted";
  const description =
    "Contactez l'équipe Horseted pour toute question ou assistance. Nous sommes là pour vous aider avec vos demandes.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function ServerContactPage() {
  return <ClientContactPage />;
}
