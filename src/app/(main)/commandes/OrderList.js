"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function OrderList({ orderType }) {
  const { user, accessToken } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log("purchases =>", purchases);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    setIsLoading(true);

    const ordersData = await fetchHorseted(
      "/orders?statuses=paid",
      accessToken
    );
    let orders = [];

    if (orderType === "purchase") {
      orders = ordersData.filter((order) => order.userId !== user.id);
    }
    if (orderType === "sale") {
      orders = ordersData.filter((order) => order.userId === user.id);
    }

    const purchasesOrSales = await Promise.all(
      orders.flatMap(async (order) => {
        const user = await fetchHorseted(`/users/${order.userId}`, accessToken);

        return Promise.all(
          order.items.map(async (item) => {
            const product = await fetchHorseted(
              `/products/${item.productId}`,
              accessToken
            );
            return { ...user, ...product };
          })
        );
      })
    );

    setOrders(purchasesOrSales.flat());
    setIsLoading(false);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {orders.map((order) => {
        const { id, title, price, username } = order;
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
