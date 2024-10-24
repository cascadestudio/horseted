import { getAddresses } from "@/fetch/addresses";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function OrderDetails({ purchaseOrSale }) {
  console.log("purchaseOrSale =>", purchaseOrSale);
  const { product, cavalier, order } = purchaseOrSale;

  const { accessToken } = useAuthContext();

  useEffect(() => {
    handleGetAddresses();
  }, []);

  const handleGetAddresses = async () => {
    const address = await getAddresses(accessToken, cavalier.id);
    console.log("address =>", address);
  };

  return (
    <>
      <div>
        <ul>
          <li>N° de commande : {order.id}</li>
          <li>Date : {order.createdAt}</li>
          <li>N°transaction :</li>
        </ul>
      </div>
      <div>Adresse de livraison</div>
      <div></div>
    </>
  );
}
