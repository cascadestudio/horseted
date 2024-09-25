"use client";

import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import HeartIcon from "@/assets/icons/HeartIcon";

export default function FavoriteButton({
  favoriteCount,
  product,
  refreshFavoritPage,
}) {
  const { user, accessToken } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const [favoriteId, setfavoriteId] = useState(null);
  const [favoriteCountState, setFavoriteCountState] = useState(favoriteCount);
  const [isGetFavoritLoading, setIsGetFavoritLoading] = useState(true);
  const [isClickLoading, setIsClickLoading] = useState(false);
  const [isUserProduct, setIsUserProduct] = useState(false);

  useEffect(() => {
    if (user) {
      getUserFavorites();
      if (product.userId === user.id) {
        setIsUserProduct(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (userFavorites.length > 0) {
      checkIsFavorite();
    }
  }, [userFavorites]);

  function checkIsFavorite() {
    const favorite = userFavorites.find(
      (favorite) => favorite.productId === product.id
    );
    if (favorite) {
      setIsFavorite(true);
      setfavoriteId(favorite.id);
    } else {
      setIsFavorite(false);
    }
  }

  async function handleFavoriteClick() {
    if (isClickLoading || isUserProduct) return;
    setIsClickLoading(true);
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      setFavoriteCountState(favoriteCountState - 1);
      await deleteFavorite();
    } else {
      setFavoriteCountState(favoriteCountState + 1);
      await postFavorite();
    }
    await getUserFavorites();
    setIsClickLoading(false);
  }

  async function getUserFavorites() {
    const favorites = await fetchHorseted("/users/me/favorits", accessToken);
    setUserFavorites(favorites);
    setIsGetFavoritLoading(false);
  }

  async function postFavorite() {
    const body = { productId: product.id };
    const query = "/users/me/favorits";
    await fetchHorseted(query, accessToken, "POST", body, true);
  }

  async function deleteFavorite() {
    const query = `/users/me/favorits/${favoriteId}`;
    await fetchHorseted(query, accessToken, "DELETE");
    if (typeof refreshFavoritPage === "function") {
      refreshFavoritPage();
    }
  }

  if (isGetFavoritLoading) return null;

  return (
    <button
      disabled={isClickLoading || isUserProduct}
      onClick={handleFavoriteClick}
      className="flex items-center flex-grow"
    >
      <HeartIcon className={isFavorite ? "fill-red" : ""} />
      <p className="leading-none ml-1">{favoriteCountState}</p>
    </button>
  );
}
