import ReturnCheckoutPage from "./ReturnCheckoutPage";

export async function generateMetadata() {
  const title = "Retour de commande | Horseted";
  const description = "Résumé de votre retour de commmande Horseted";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function ServerReturnCheckoutPage() {
  return <ReturnCheckoutPage />;
}
