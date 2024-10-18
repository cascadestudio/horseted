import ClientSellerPage from "./ClientSellerPage";
import fetchHorseted from "@/utils/fetchHorseted";

export async function generateMetadata({ params }) {
  const { id } = params;
  const seller = await fetchHorseted(`/users/${id}`);

  const metaTitle = seller
    ? `${seller.username} | Horseted`
    : "Vendeur | Horseted";
  const metaDescription = "Découvrez ma sellerie sur Horseted.";

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default function ServerSellerPage({ params }) {
  return <ClientSellerPage params={params} />;
}
