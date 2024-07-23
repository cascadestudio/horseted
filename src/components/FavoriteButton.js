"use client";

import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

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
      <svg
        className={isFavorite ? "fill-red" : ""}
        width="23"
        height="20"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7322 12.3442C16.3639 16.7068 13.6925 18.2729 12.4148 18.8322C11.8341 19.0559 11.1372 19.0559 10.5564 18.8322C9.2788 18.2729 6.60737 16.7068 3.23905 12.3442C1.84526 10.2189 -0.82617 5.29698 2.8906 2.053C6.37507 -0.184225 9.2788 1.82928 10.6726 3.17162C11.1372 3.61906 11.9502 3.61906 12.4148 3.17162C13.8086 1.82928 16.7123 -0.296086 20.1968 2.053C23.7974 5.29698 21.126 10.2189 19.7322 12.3442Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="leading-none ml-1">{favoriteCountState}</p>
    </button>
  );
}
