"use client";

import HeartFilledIcon from "@/assets/icons/HeartFilledIcon";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";

function FavoritesPage() {
  const { accessToken } = useAuthContext();
  const [favorites, setfavorites] = useState(null);

  // console.log("favorites =>", favorites);

  useEffect(() => {
    if (accessToken) {
      getUserfavoritess();
    }
  }, [accessToken]);

  async function getUserfavoritess() {
    const data = await fetchHorseted("/users/me/favorits", accessToken);
    setfavorites(data);
  }

  if (favorites === null) {
    return <Spinner />;
  }

  return (
    <div className="bg-light-grey min-h-screen">
      <div className="container mx-auto px-5 pt-12">
        {favorites.length > 0 ? (
          favorites.map((favorites, index) => {
            return <ProductCard key={index} productId={favorites.productId} />;
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
