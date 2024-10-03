import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export async function generateMetadata() {
  return {
    title: `Tous les articles | Application Horseted`,
    description: `Tous les articles | Application Horseted`,
  };
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
