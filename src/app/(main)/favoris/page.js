"use client";

import HeartFilledIcon from "@/assets/icons/HeartFilledIcon";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import Breadcrumbs from "@/components/Breadcrumbs";
import RightArrow from "@/assets/icons/RightArrow";

function FavoritesPage() {
  const { accessToken } = useAuthContext();
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    if (accessToken) {
      getUserFavorites();
    }
  }, [accessToken]);

  async function getUserFavorites() {
    const data = await fetchHorseted("/users/me/favorits", accessToken);
    setFavorites(data);
  }

  if (favorites === null) {
    return <Spinner />;
  }

  const breadcrumbs = [{ label: "Accueil", href: "/" }, { label: "Favoris" }];

  return (
    <div className="container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-mcqueen font-bold">Articles favoris</h1>
        {favorites.length > 0 && (
          <Button href="/articles" variant="transparent-green">
            Parcourir les articles
            <RightArrow className={"ml-2"} />
          </Button>
        )}
      </div>
      {favorites.length > 0 ? (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 py-12">
          {favorites.map((favorite, index) => (
            <ProductCard key={index} productId={favorite.productId} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center py-20 min-h-screen">
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
  );
}

export default withAuth(FavoritesPage);
