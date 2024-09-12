import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import fetchHorseted from "@/utils/fetchHorseted";
import StarRating from "@/components/StarRating";
import { usePathname } from "next/navigation";

export default function ProfileTabs({ profile }) {
  const { accessToken } = useAuthContext();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    if (profile) {
      getProducts();
      getReviews();
    }
  }, [profile]);

  const getProducts = async () => {
    const query = `/products?userId=${profile.id}`;
    const products = await fetchHorseted(query, accessToken);
    setProducts(products.items);
  };

  const getReviews = async () => {
    const response = await fetchHorseted(
      `/users/${profile.id}/reviews`,
      accessToken
    );
    setReviews(response);
  };

  const globalReview = {
    count: reviews?.reviews?.length,
    rating: reviews?.rating,
  };

  return (
    <div className="mt-8">
      <div className="flex border-b border-lighter-grey">
        <button
          className={`px-4 py-2 text-lg font-medium font-mcqueen ${
            activeTab === "products"
              ? "text-light-green border-b-[3px] border-light-green"
              : "text-grey"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Sellerie
        </button>
        <button
          className={`px-4 py-2 text-lg font-medium font-mcqueen ${
            activeTab === "reviews"
              ? "text-light-green border-b-[3px] border-light-green"
              : "text-grey"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Évaluations
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "products" ? (
          <>
            {products.length > 0 && (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full gap-14 py-12">
                {products.map((product, index) => (
                  <div key={index}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </section>
            )}
            {products.length === 0 && (
              <section className="flex flex-col items-center justify-center text-center gap-7 max-w-[1050px] pt-8">
                <img
                  src="/images/baby-horse.svg"
                  alt="Illustration bébé cheval"
                />
                <h1 className="font-mcqueen font-bold text-3xl">
                  Aucune vente en cours
                </h1>

                {pathname.startsWith("/mon-compte") && (
                  <p className="max-w-[475px] mb-6">
                    Vous ne proposez aucun produit à la vente pour le moment
                  </p>
                )}
                {pathname.startsWith("/vendeur") && (
                  <p className="max-w-[475px] mb-6">
                    Ce vendeur ne propose pas encore de produit
                  </p>
                )}
              </section>
            )}
          </>
        ) : (
          activeTab === "reviews" && (
            <>
              {reviews?.reviews?.length > 0 && (
                <>
                  <div className="flex flex-col items-center justify-center border-b border-lighter-grey mb-8 pb-5">
                    <p className="font-mcqueen font-semibold text-[40px] leading-[48px]">
                      {reviews.rating}
                    </p>
                    <p className="font-mcqueen">
                      {reviews.reviews.length} évaluations
                    </p>
                    <StarRating review={globalReview} size="sm" />
                  </div>
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                    {reviews.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center break-inside-avoid mb-3"
                      >
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {reviews?.reviews?.length === 0 && (
                <section className="flex flex-col items-center justify-center text-center gap-7 max-w-[1050px] pt-8">
                  <img
                    src="/images/baby-horse.svg"
                    alt="Illustration bébé cheval"
                  />
                  <h1 className="font-mcqueen font-bold text-3xl">
                    Aucune évaluation
                  </h1>
                  {pathname.startsWith("/mon-compte") && (
                    <p className="max-w-[475px] mb-6">
                      Commencer à acheter ou vendre un article pour recevoir une
                      évaluation
                    </p>
                  )}
                  {pathname.startsWith("/vendeur") && (
                    <p className="max-w-[475px] mb-6">
                      Ce vendeur n'a pas encore reçu d'évaluation
                    </p>
                  )}
                </section>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
