import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export async function generateMetadata() {
  return {
    title: `Tous les articles | Horseted`,
    description: `Tous les articles | Horseted`,
  };
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
