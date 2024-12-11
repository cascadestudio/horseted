"use client";

import { ThreadsProvider } from "@/app/(main)/messagerie/context/ThreadsContext";
import withAuth from "@/hoc/withAuth";
import Breadcrumbs from "@/components/Breadcrumbs";
import ThreadsContainer from "./ThreadsContainer";
import { useSearchParams } from "next/navigation";

const breadcrumbs = [
  { label: "Accueil", href: "/" },
  { label: "Mon compte", href: "/mon-compte" },
  { label: "Messagerie" },
];

function ThreadsPage() {
  const searchParams = useSearchParams();
  const orderId = parseInt(searchParams.get("orderId"), 10);
  const productIdParam = parseInt(searchParams.get("productId"));

  return (
    <ThreadsProvider orderId={orderId} productIdParam={productIdParam}>
      <div className="container mx-auto px-5 pb-10">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <ThreadsContainer />
      </div>
    </ThreadsProvider>
  );
}

export default withAuth(ThreadsPage);
