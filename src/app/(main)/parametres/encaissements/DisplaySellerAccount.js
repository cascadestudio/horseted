import React from "react";

export default function DisplaySellerAccount({ sellerData }) {
  console.log("sellerData =>", sellerData);
  return (
    <div className="grid grid-cols-1 lg:pt-5 lg:grid-cols-2 lg:gap-x-14 gap-y-4">
      <div className="col-span-2 lg:col-span-1">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Informations vendeur
        </h2>
      </div>
    </div>
  );
}
