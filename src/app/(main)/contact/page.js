import ClientContactPage from "./ClientContactPage";

export async function generateMetadata() {
  const title = "Contactez l'équipe Horseted | Horseted";
  const description =
    "Contactez l'équipe Horseted pour toute question ou assistance. Nous sommes là pour vous aider avec vos demandes.";
  const image = "images/horsetedApp.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_BASE_URL}${image}`,
      //     alt: "Contactez l'équipe Horseted",
      //   },
      // ],
    },
  };
}

export default function ServerContactPage() {
  return <ClientContactPage />;
}
