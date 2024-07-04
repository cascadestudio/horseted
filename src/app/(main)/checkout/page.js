"use client";

import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import PaymentMethods from "@/components/PaymentMethods";

const CheckOutPage = () => {
  // TODO : Click on "Payer" => POST /orders
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState({});
  const { user } = useAuthContext();
  console.log(user);

  useEffect(() => {
    getProduct(productId, setProduct);
    // getPaymentMethods(productId, setProduct)
  }, []);

  return (
    <div>
      {product.title}
      <PaymentMethods />
    </div>
  );
};

async function getProduct(productId, setProduct) {
  const product = await fetchHorseted(`/products/${productId}`);
  setProduct(product);
}

// async function getPaymentMethods(productId, setProduct) {
//   const product = await fetchHorseted(`/users/${user.id}/payment_methods`);
//   setProduct(product);
// }

export default withAuth(CheckOutPage);
