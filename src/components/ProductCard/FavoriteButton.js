import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

export default function FavoriteButton({ favoritCount, productId }) {
  const { accessToken } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (accessToken) {
      getUserFavorites();
    }
  }, [accessToken]);

  async function getUserFavorites() {
    const favorites = await fetchHorseted("/users/me/favorits", accessToken);
    // console.log("handleFavoriteClick =>", favorites);
    favorites.forEach((favorite) => {
      if (favorite.id === productId) {
        setIsFavorite(true);
      }
    });
  }

  async function handleFavoriteClick() {
    const body = { productId: productId };
    const query = "/users/me/favorits";
    const data = await fetchHorseted(query, accessToken, "POST", body, true);
  }

  return (
    <button
      onClick={() => {
        handleFavoriteClick();
      }}
      className="flex items-center flex-grow"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isFavorite ? "fill-red" : ""}
      >
        <path
          d="M12.2133 3.27067L12.2131 3.27091L11.3666 4.18202L11.0003 4.5763L10.634 4.18202L9.78754 3.27091L9.78698 3.27031C7.79099 1.1148 4.59442 0.801426 2.46866 2.6935C-0.0162046 4.90893 -0.151196 8.9045 2.0773 11.3112L12.2133 3.27067ZM12.2133 3.27067C14.2139 1.11454 17.4063 0.801612 19.5319 2.69341C22.0169 4.90885 22.1518 8.90443 19.9191 11.3111L19.919 11.3112L11.6048 20.2786C11.2656 20.6443 10.7308 20.6443 10.3915 20.2786L2.07751 11.3114L12.2133 3.27067Z"
          stroke="black"
        />
      </svg>
      <p className="leading-none ml-1">{favoritCount}</p>
    </button>
  );
}
