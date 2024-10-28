"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getOrderDocuments, getPaymentInfos } from "@/fetch/orders";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { getProducts } from "@/fetch/products";
import { getUser } from "@/fetch/users";
import Button from "@/components/Button";
import { ISOtoDate } from "@/utils/formatDate";

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

  const handleDocumentDownload = async (documentType) => {
    const documentName = `order_${orderId}_${documentType}.pdf`;
    const blob = await getOrderDocuments(
      orderId,
      documentType,
      accessToken,
      documentName
    );

    if (blob) {
      downloadDocument(blob, documentName);
      return;
    }
  };

  const downloadDocument = (blob, documentName) => {
    const pdfBlob = new Blob([blob], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = documentName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!paymentInfos || !products || !user) {
    return <Spinner />;
  }

  const { amount, appFees, date, paymentMethod, shipping, shippingPrice } =
    paymentInfos;

  return (
    <>
      <div className="bg-white rounded-xl p-8 border border-lighter-grey">
        <ul>
          <li className="font-semibold">
            <span className="underline">N° de commande</span> :{" "}
            <span className="font-poppins">{orderId}</span>
          </li>
          <li className="font-semibold">
            <span className="underline">Date</span> :{" "}
            <span className="font-poppins">{ISOtoDate(date)}</span>
          </li>
          <li className="font-semibold">
            <span className="underline">N°transaction</span> :{" "}
            <span className="font-poppins">{paymentMethod}</span>
          </li>
        </ul>
      </div>
      <div className="bg-white rounded-xl p-8 border border-lighter-grey">
        <h2 className="font-bold mb-2">Adresse de livraison</h2>
        <p className="text-sm">
          {shipping.name}, {shipping.street}
          <br />
          {shipping.postalCode} {shipping.city}
        </p>
      </div>
      <div className="bg-white rounded-xl p-8 border border-lighter-grey">
        <h2 className="font-bold mb-2">Résumé de la commande</h2>
        <ul>
          <li className="flex justify-between">
            <span className="font-semibold">Commande</span>
            <span className="font-poppins font-medium">{amount}€</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Frais de port</span>
            <span className="font-poppins font-medium">{shippingPrice}€</span>
          </li>
          <li className="flex justify-between">
            <button
              className="text-light-green underline font-semibold"
              onClick={() => handleDocumentDownload("fees_invoice")}
            >
              Protection acheteur
              <img
                className="relative top-[-8px] ml-1 inline-block"
                src="/icons/external-link.svg"
                alt=""
              />
            </button>{" "}
            <span className="font-poppins font-medium">{appFees}€</span>
          </li>
          <li className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="font-poppins font-extrabold">
              {amount + shippingPrice + appFees}€
            </span>
          </li>
        </ul>
      </div>
      <Button onClick={() => handleDocumentDownload("receipt")}>
        Voir le reçu
      </Button>
    </>
  );
}
