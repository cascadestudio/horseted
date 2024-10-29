import { Suspense } from "react";
import ProductsContent from "./ProductsContent";
import { getAllCategories } from "@/fetch/categories";

export async function generateMetadata() {
  return {
    title: `Tous les articles | Horseted`,
    description: `Tous les articles | Horseted`,
  };
}

export default async function ProductsPage() {
  const categories = await getAllCategories();

  return (
    <Suspense>
      <ProductsContent categories={categories} />
    </Suspense>
  );
}
