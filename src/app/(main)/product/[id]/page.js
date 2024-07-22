import fetchHorseted from "@/utils/fetchHorseted";
import ProductInfoSection from "./ProductInfoSection";
import ProductsSection from "@/components/ProductsSection";
import ProductMediaSection from "./ProductMediaSection";

export default async function ProductPage({ params }) {
  const product = await fetchHorseted(`/products/${params.id}`);
  const userData = await fetchHorseted(`/users/${product.userId}`);
  const userProducts = await fetchHorseted(
    `/products?orderBy=createdAt;desc&userId=${product.userId}`
  );

  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 ">
        <div className="border-b border-grey py-10 flex flex-col items-center mb-10 lg:flex-row lg:items-start lg:justify-center lg:mb-11 lg:py-12">
          <ProductMediaSection medias={product.medias} />
          <ProductInfoSection
            product={product}
            userData={userData}
            userProducts={userProducts}
            params={params}
          />
        </div>
        <ProductsSection title="Sellerie de" />
        <ProductsSection title="Articles similaires" />
      </div>
    </div>
  );
}
