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
  const userIdParam = parseInt(searchParams.get("userId"));

  return (
    <ThreadsProvider
      orderId={orderId}
      productIdParam={productIdParam}
      userIdParam={userIdParam}
    >
      <div className="container mx-auto px-5 pb-10">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <ThreadsContainer />
      </div>
    </ThreadsProvider>
  );
}

export default withAuth(ThreadsPage);
