import React from "react";

export default function DisplaySellerAccount({ sellerData }) {
  const {
    ibanLast4,
    address,
    dateOfBirth,
    firstName,
    lastName,
    verificationStatus,
  } = sellerData;

  // console.log("sellerData =>", sellerData);

  return (
    <div className="grid grid-cols-1 lg:pt-5 lg:grid-cols-2 lg:gap-x-14 gap-y-4">
      <div className="col-span-2 lg:col-span-1 flex flex-col">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Informations vendeur
        </h2>
        <div>IBAN : **** **** **** {ibanLast4}</div>
        <div>
          Adresse d’expédition* :{address.city}
          {address.postalCode}
          <br />
          {address.street}
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Vérification de l’identité
        </h2>
        {verificationStatus === "pending" && ( // Voir avec Jojo pour les autres status
          <p className="text-light-yellow">En cours</p>
        )}
        {verificationStatus === "verified" && ( // Voir avec Jojo pour les autres status
          <p className="text-light-green">Vérifié</p>
        )}
        {firstName} <br />
        {lastName} <br />
        {dateOfBirth} <br />
      </div>
    </div>
  );
}
