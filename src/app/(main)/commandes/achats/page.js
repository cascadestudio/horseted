"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Achats() {
  const { user, accessToken } = useAuthContext();
  const [purchases, setPurchases] = useState([]);

  console.log("purchases =>", purchases);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const orders = await fetchHorseted("/orders?statuses=paid", accessToken);

    const purchasedOrders = orders.filter((order) => order.userId !== user.id);

    const purchases = await Promise.all(
      purchasedOrders.flatMap(async (purchasedOrder) => {
        const user = await fetchHorseted(
          `/users/${purchasedOrder.userId}`,
          accessToken
        );
        console.log("user =>", user);

        return Promise.all(
          purchasedOrder.items.map(async (item) => {
            const product = await fetchHorseted(
              `/products/${item.productId}`,
              accessToken
            );
            console.log("product =>", product);
            return { ...user, ...product };
          })
        );
      })
    );

    setPurchases(purchases.flat());
  }

  return (
    <div>
      {purchases.map((purchase) => {
        const { id, title, price, username } = purchase;
        return (
          <div key={id}>
            <p>{title}</p>
            <p>{username}</p>
            <p>{price}€</p>
          </div>
        );
      })}
    </div>
  );
}
