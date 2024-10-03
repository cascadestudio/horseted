import fetchHorseted from "@/utils/fetchHorseted";
import ProductInfoSection from "./ProductInfoSection";
import ProductsSection from "@/components/ProductsSection";
import ProductMediaSection from "./ProductMediaSection";
import { getProducts } from "@/fetch/products";
import getImage from "@/utils/getImage";

export async function generateMetadata({ params }) {
  const product = await getProducts(params.id);
  const medias = product.medias;

  const getMedias = async (medias) => {
    if (!medias) return;
    return await Promise.all(
      medias.map(async (media) => {
        const base64 = await getImage(media.files.thumbnail1000, "server");
        return {
          ...media,
          base64,
        };
      })
    );
  };

  const base64Medias = await getMedias(medias);

  const productImage = base64Medias?.length > 0 ? base64Medias[0] : null;

  return {
    title: `${product.title} | Application Horseted`,
    description: `${product.title} – article d’équitation de seconde main sur Horseted`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${params.id}`,
    openGraph: {
      images: [
        {
          url:
            `data:image/png;base64, ${productImage.base64}` ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/images/og-image.jpg`,
          type: "image/png",
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProducts(params.id);
  const sellerData = await fetchHorseted(`/users/${product.userId}`);
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
            sellerData={sellerData}
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
