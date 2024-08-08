"use client";

import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import HeartIcon from "@/assets/icons/HeartIcon";

export default function FavoriteButton({ favoriteCount, productId }) {
  const { user, accessToken } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const [favoriteId, setfavoriteId] = useState(null);
  const [favoriteCountState, setFavoriteCountState] = useState(favoriteCount);

  useEffect(() => {
    if (user) {
      getUserFavorites();
    }
  }, [user]);

  useEffect(() => {
    if (userFavorites.length > 0) {
      checkIsFavorite();
    }
  }, [userFavorites]);

  function checkIsFavorite() {
    const favorite = userFavorites.find(
      (favorite) => favorite.productId === productId
    );
    if (favorite) {
      setIsFavorite(true);
      setfavoriteId(favorite.id);
    } else {
      setIsFavorite(false);
    }
  }

  async function handleFavoriteClick() {
    if (isFavorite) {
      deleteFavorite();
      setFavoriteCountState(favoriteCountState - 1);
    } else {
      postFavorite();
      setFavoriteCountState(favoriteCountState + 1);
    }
    setIsFavorite(!isFavorite);
  }

  async function getUserFavorites() {
    const favorites = await fetchHorseted("/users/me/favorits", accessToken);
    setUserFavorites(favorites);
  }

  async function postFavorite() {
    const body = { productId: productId };
    const query = "/users/me/favorits";
    await fetchHorseted(query, accessToken, "POST", body, true);
  }

  async function deleteFavorite() {
    const query = `/users/me/favorits/${favoriteId}`;
    await fetchHorseted(query, accessToken, "DELETE");
  }

  return (
    <button
      onClick={handleFavoriteClick}
      className="flex items-center flex-grow"
    >
      <HeartIcon className={isFavorite ? "fill-red" : ""} />
      <p className="leading-none ml-1">{favoriteCountState}</p>
    </button>
  );
}
