import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import fetchHorseted from "@/utils/fetchHorseted";
import StarRating from "@/components/StarRating";

export default function ProfileTabs({ profile, accessToken }) {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  console.log("reviews =>", reviews);

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
    const reviews = await fetchHorseted(
      `/users/${profile.id}/reviews`,
      accessToken
    );
    setReviews(reviews);
  };

  if (products.length > 0 && reviews.length > 0) return null;

  return (
    <div className="mt-8">
      <div className="flex border-b border-lighter-grey">
        {products.length > 0 && (
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
        )}
        {reviews.length > 0 && (
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
        )}
      </div>
      <div className="mt-4">
        {activeTab === "products" && products.length > 0 && (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 py-12">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </section>
        )}
        {activeTab === "reviews" && reviews.length > 0 && (
          <div>
            <div className="flex flex-col items-center justify-center border-b border-lighter-grey mb-8 pb-5">
              <p className="font-mcqueen font-semibold text-[40px] leading-[48px]">
                4.5
              </p>
              <p className="font-mcqueen">{reviews.length} évaluations</p>
              <StarRating rating="4.5" count="6" />
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center break-inside-avoid mb-3"
                >
                  <ReviewCard
                    avatarSrc={review.avatarSrc}
                    author={review.author}
                    date={review.date}
                    rating={review.rating}
                    comment={review.comment}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
