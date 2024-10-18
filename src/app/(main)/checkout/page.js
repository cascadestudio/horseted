import ClientCheckoutPage from "./ClientCheckoutPage";

export const metadata = {
  title: "Votre commande | Horseted",
  description:
    "Résumé de votre commande sur Horseted. Veuillez vérifier les articles et confirmer votre achat.",
  openGraph: {
    title: "Votre commande | Horseted",
    description:
      "Résumé de votre commande sur Horseted. Veuillez vérifier les articles et confirmer votre achat.",
  },
};

export default async function ServerCheckOutPage() {
  return <ClientCheckoutPage />;
}
