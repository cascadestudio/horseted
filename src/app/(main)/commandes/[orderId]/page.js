"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getOrderDocuments, getPaymentInfos } from "@/fetch/orders";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { getProducts } from "@/fetch/products";
import { getUser } from "@/fetch/users";
import Button from "@/components/Button";
import { ISOtoShortDate } from "@/utils/formatDate";
import ClientProductImage from "@/components/ClientProductImage";
import AvatarDisplay from "@/components/AvatarDisplay";
import StarRating from "@/components/StarRating";
import Link from "next/link";
import MessageGreenIcon from "@/assets/icons/MessageGreenIcon";
import { centsToEuros } from "@/utils/centsToEuros";
import { downloadLabel } from "@/utils/downloadLabel";
import { downloadDocument } from "@/utils/downloadDocument";

export default function OrderDetails({ params }) {
  const { orderId } = params;
  const { accessToken } = useAuthContext();

  const searchParams = useSearchParams();
  const productIds = searchParams.get("productIds");
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
  };

  const handleGetProducts = async () => {
    const productIdsArray = productIds.split(";").map((id) => parseInt(id, 10));
    const products = await Promise.all(
      productIdsArray.map(async (productId) => {
        const product = await getProducts(productId);
        return product;
      })
    );

    setProducts(products);
  };

  const handleGetUser = async () => {
    const user = await getUser(accessToken, cavalierId);
    setUser(user);
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

  if (!paymentInfos || !products || !user) {
    return <Spinner />;
  }

  const { amount, appFees, date, paymentMethod, shipping, shippingPrice } =
    paymentInfos;

  return (
    <div className="flex flex-col lg:flex-row lg:gap-7">
      <div className="flex-[6] w-full lg:w-auto">
        <div className="bg-white rounded-xl p-8 border border-lighter-grey mb-3">
          <ul>
            <li className="font-semibold">
              <span className="underline">N° de commande</span> :{" "}
              <span className="font-poppins">{orderId}</span>
            </li>
            <li className="font-semibold">
              <span className="underline">Date</span> :{" "}
              <span className="font-poppins">{ISOtoShortDate(date)}</span>
            </li>
            <li className="font-semibold">
              <span className="underline">N°transaction</span> :{" "}
              <span className="font-poppins">{paymentMethod}</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-8 border border-lighter-grey mb-3">
          <h2 className="font-bold mb-2">Adresse de livraison</h2>
          <p className="text-sm">
            {shipping.name}, {shipping.street}
            <br />
            {shipping.postalCode} {shipping.city}
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 border border-lighter-grey mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {products.map((product) => (
                <ClientProductImage
                  key={product.id}
                  product={product}
                  size="small"
                  className="h-[50px] w-[50px] mr-2"
                />
              ))}
              <div className="font-extrabold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
                <p>
                  {products.length > 1
                    ? `${products.length} articles`
                    : products[0].title}
                </p>
              </div>
            </div>
            <div className="font-poppins font-extrabold text-sm">
              {centsToEuros(amount)}€
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white rounded-xl p-8 border border-lighter-grey mb-4">
          <div className="flex items-center">
            <AvatarDisplay avatar={user.avatar} size={56} />
            <div className="ml-3">
              <p className="font-mcqueen font-semibold text-lg capitalize">
                {user.username}
              </p>
              <StarRating review={user.review} />
            </div>
          </div>
          <Link href={`/messagerie?orderId=${orderId}`} className="h-8 w-8">
            <MessageGreenIcon />
          </Link>
        </div>
      </div>
      <div className="flex-[4] w-full lg:w-auto">
        <div className="bg-white rounded-xl p-8 border border-lighter-grey mb-4">
          <h2 className="font-bold mb-8">Résumé de la commande</h2>
          <ul>
            <li className="flex justify-between mb-3">
              <span className="font-semibold">Commande</span>
              <span className="font-poppins font-medium">
                {centsToEuros(amount)}€
              </span>
            </li>
            <li className="flex justify-between mb-3">
              <span className="font-semibold">Frais de port</span>
              <span className="font-poppins font-medium">
                {centsToEuros(shippingPrice)}€
              </span>
            </li>
            <li className="flex justify-between mb-14">
              <button
                className="text-light-green underline font-semibold text-start"
                onClick={() => handleDocumentDownload("fees_invoice")}
              >
                Protection acheteur
                <img
                  className="relative top-[-8px] ml-1 inline-block"
                  src="/icons/external-link.svg"
                  alt=""
                />
              </button>{" "}
              <span className="font-poppins font-medium">
                {centsToEuros(appFees)}€
              </span>
            </li>
            <li className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="font-poppins font-extrabold">
                {centsToEuros(amount + shippingPrice + appFees)}€
              </span>
            </li>
          </ul>
        </div>
        <Button
          className={"w-full"}
          onClick={() => handleDocumentDownload("receipt")}
        >
          Voir le reçu
        </Button>
        <Button
          variant={"transparent-green"}
          className="w-full mt-2"
          onClick={() => downloadLabel(accessToken, orderId)}
        >
          Imprimer l'étiquette
        </Button>
      </div>
    </div>
  );
}
