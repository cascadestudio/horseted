import AvatarDisplay from "@/components/AvatarDisplay";
import ClientProductImage from "@/components/ClientProductImage";
import React from "react";

export default function threadInfo({ seller, product, order }) {
  // console.log("order =>", order);
  return (
    <div className="flex flex-col">
      <div className="flex items-center p-5">
        <AvatarDisplay avatar={seller.avatar} size={54} className="flex-none" />
        {seller.username}
      </div>
      <div className="flex items-center p-5">
        <ClientProductImage product={product} size={"small"} />
        {product.title}
        {product.price}€
      </div>
      {order && order.statuses[0].status === "readyToSend" && (
        <div>
          <p>Commande validée !</p>
          <p>La commande est validée et en attente de livraison.</p>
          <div>
            <p>Numéro de suivi colissimo créé</p>
            <p>{order.number}</p>
            <p>{order.createdAt}</p>
            <p>Colis en attente de livraison</p>
            <p>{order.statuses[0].updatedAt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
