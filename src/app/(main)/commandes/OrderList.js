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
  const [ordersWithProducts, setOrdersWithProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const products = await Promise.all(
          order.items.map(async (item) => {
            const product = await fetchHorseted(
              `/products/${item.productId}`,
              accessToken
            );
            return product;
          })
        );

        return { order, products };
      })
    );

    setOrdersWithProducts(ordersWithProducts);
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
          {ordersWithProducts.length === 0 ? (
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
            ordersWithProducts.map(({ order, products }) => {
              const cavalier =
                orderType === "sale" ? order.buyer : order.seller;
              return (
                <tr key={order.id} className="border-b border-lighter-grey">
                  <td className="py-4 pr-2 text-sm lg:text-base font-semibold">
                    {products.map((product) => (
                      <div key={product.id}>{product.title}</div>
                    ))}
                  </td>
                  <td className="py-4 pr-2 text-sm lg:text-base text-light-green font-semibold truncate capitalize">
                    <Link href={`/vendeur/${cavalier.id}`}>
                      {cavalier.username}
                    </Link>
                  </td>
                  <td className="py-4 px-2 text-sm lg:text-base font-poppins font-semibold text-center">
                    {centsToEuros(order.transferAmount)}€
                  </td>
                  <td className="py-4 px-2 text-sm lg:text-base text-center">
                    <Link
                      href={{
                        pathname: `/commandes/${order.id}`,
                        query: {
                          productIds: [
                            products.map((product) => product.id).join(";"),
                          ],
                          cavalierId: cavalier.id,
                        },
                      }}
                      className="font-semibold text-light-green"
                    >
                      Voir
                    </Link>
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
