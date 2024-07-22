"use client";

import ProductsSection from "@/components/ProductsSection";
import HeartFilledIcon from "@/assets/icons/HeartFilledIcon";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import ProductCard from "@/components/ProductCard";

function FavoritesPage() {
  const { accessToken } = useAuthContext();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  console.log("favoriteProducts =>", favoriteProducts);

  useEffect(() => {
    if (accessToken) {
      getUserFavorites();
    }
  }, [accessToken]);

  async function getUserFavorites() {
    const data = await fetchHorseted("/users/me/favorits", accessToken);
    setFavoriteProducts(data);
  }

  return (
    <div className="bg-light-grey min-h-screen">
      <div className="container mx-auto px-5 pt-12">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product, index) => {
            return <ProductCard key={index} productId={product.id} />;
          })
        ) : (
          <div className="flex flex-col items-center py-20">
            <HeartFilledIcon className="mx-auto mb-10 text-red w-[116px] h-[90px]" />
            <h2 className="text-3xl font-mcqueen font-bold mb-4">
              Aucun favoris
            </h2>
            <p className="text-[14px]">
              Sauvegardez vos articles préférez dans vos favoris.
            </p>
            <Button
              href="/articles"
              variant="transparent-black"
              className="mt-10"
            >
              Parcourir les articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(FavoritesPage);
