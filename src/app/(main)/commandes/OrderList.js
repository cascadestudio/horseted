"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { centsToEuros } from "@/utils/centsToEuros";
import Button from "@/components/Button";
import Link from "next/link";

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

    if (orderType === "sale") {
      orders = ordersData.filter((order) => order.userId !== user.id);
    }
    if (orderType === "purchase") {
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
    <div className="overflow-x-auto">
      <div className="flex justify-end">
        <Button href="/parametres" className="my-5 lg:my-12">
          Paramètres
        </Button>
      </div>
      <table className="min-w-full border-collapse">
        <thead className="">
          <tr>
            <th className=" py-3 text-left text-xs font-semibold border-b border-black">
              TITRE
            </th>
            <th className=" py-3 text-left text-xs font-semibold border-b border-black">
              CAVALIER
            </th>
            <th className=" py-3 text-center text-xs font-semibold border-b border-black">
              MONTANT
            </th>
            <th className=" py-3 text-center text-xs font-semibold border-b border-black">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="py-4 text-center text-sm lg:text-base font-semibold"
              >
                {orderType === "sale"
                  ? "Vous n'avez pas effectué de ventes."
                  : "Vous n'avez pas effectué d'achat."}
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              const { id, title, price, username } = order;
              return (
                <tr key={id} className="border-b border-lighter-grey">
                  <td className="py-4 pr-2 text-sm lg:text-base font-semibold">
                    {title}
                  </td>
                  <td className="py-4 pr-2 text-sm lg:text-base text-light-green font-semibold truncate">
                    {username}
                  </td>
                  <td className="py-4 px-2 text-sm lg:text-base font-poppins font-semibold text-center">
                    {centsToEuros(price)}€
                  </td>
                  <td className="py-4 px-2 text-sm lg:text-base text-center">
                    <a href="#" className="font-semibold text-light-green">
                      Voir
                    </a>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
