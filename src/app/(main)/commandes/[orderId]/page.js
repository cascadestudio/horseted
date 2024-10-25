"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getPaymentInfos } from "@/fetch/orders";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { getProducts } from "@/fetch/products";
import { getUser } from "@/fetch/users";

export default function OrderDetails({ params }) {
  const { orderId } = params;
  const { accessToken } = useAuthContext();

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const cavalierId = searchParams.get("cavalierId");

  const [paymentInfos, setPaymentInfos] = useState(null);
  const [products, setProducts] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleGetPaymentInfos();
    handleGetProducts();
    handleGetUser();
  }, []);

  const handleGetPaymentInfos = async () => {
    const paymentInfos = await getPaymentInfos(accessToken, orderId);
    setPaymentInfos(paymentInfos);
    console.log("paymentInfos =>", paymentInfos);
  };

  const handleGetProducts = async () => {
    const product = await getProducts(productId);
    setProducts(product);
    console.log("product =>", product);
  };

  const handleGetUser = async () => {
    const user = await getUser(accessToken, cavalierId);
    setUser(user);
    console.log("user =>", user);
  };

  if (!paymentInfos || !products || !user) {
    return <Spinner />;
  }

  const { amount, appFees, date, paymentMethod, shipping, shippingPrice } =
    paymentInfos;

  return (
    <>
      <div>
        <ul>
          <li>N° de commande : {orderId}</li>
          <li>Date : {date}</li>
          <li>N°transaction : {paymentMethod}</li>
        </ul>
      </div>
      <div>
        <h2>Adresse de livraison</h2>
        {shipping.name}, {shipping.postalCode}, {shipping.street},
        {shipping.city}
      </div>
      <div>
        <h2>Résumé de la commande</h2>
        <ul>
          <li>Commande : {amount}€</li>
          <li>Frais de port : {shippingPrice}€</li>
          <li>Protection acheteur : {appFees}€</li>
          <li>Total : {amount + shippingPrice + appFees}€</li>
        </ul>
      </div>
    </>
  );
}
