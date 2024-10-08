import OrderList from "../OrderList";

export async function generateMetadata() {
  const title = "Commandes | Horseted";
  const description =
    "Consultez vos commandes effectués sur Horseted. Retrouvez ici toutes vos commandes récentes et passées.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function Achats() {
  return <OrderList orderType="purchase" />;
}
