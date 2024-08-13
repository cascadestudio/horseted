import AvatarDisplay from "@/components/AvatarDisplay";
import ClientProductImage from "@/components/ClientProductImage";
import React from "react";

export default function threadInfo({ seller, product }) {
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
    </div>
  );
}
