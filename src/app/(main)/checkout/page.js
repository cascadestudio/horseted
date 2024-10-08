import ClientCheckoutPage from "./ClientCheckoutPage";

export async function generateMetadata() {
  const title = "Votre commande | Horseted";

  const description =
    "Résumé de votre commande sur Horseted. Veuillez vérifier les articles et confirmer votre achat.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ServerCheckOutPage() {
  return <ClientCheckoutPage />;
}
