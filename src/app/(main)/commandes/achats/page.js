"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Achats() {
  const { user, accessToken } = useAuthContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const orders = await fetchHorseted("/orders?statuses=paid", accessToken);

    const purchases = orders.filter((order) => order.userId !== user.id);

    const products = await Promise.all(
      purchases.flatMap((purchase) =>
        purchase.items.map(async (item) => {
          return await fetchHorseted(
            `/products/${item.productId}`,
            accessToken
          );
        })
      )
    );

    setProducts(products);
    console.log("products =>", products);
  }

  return (
    <div>
      {products.map((product) => {
        const { id, title } = product;
        return (
          <div key={id}>
            <p>{title}</p>
          </div>
        );
      })}
    </div>
  );
}
