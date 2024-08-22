import React from "react";

export default function DisplaySellerAccount() {
  //export default function DisplaySellerAccount({ sellerData }) {
  const sellerData = {
    ibanLast4: "123",
    address: {
      city: "Paris",
      postalCode: "75001",
      street: "15 Rue de Rivoli",
    },
    dateOfBirth: "1990-01-01",
    firstName: "John",
    lastName: "Doe",
    verificationStatus: "verified",
  };
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
        <div className="border-b border-black mt-8 pb-2">
          <h3 className="font-mcqueen font-semibold mb-2">IBAN</h3>
          <div className="font-poppins font-medium text-sm">
            FR76 **** **** **** **** **** {ibanLast4}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-mcqueen font-semibold mb-2">
            Adresse d’expédition* :
          </h3>
          <p className="text-sm">
            {address.street}
            <br />
            {address.postalCode} {address.city}
          </p>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Vérification de l’identité
        </h2>
        <div className="text-light-green flex flex-col gap-2 items-center justify-center w-full border border-light-green border-dashed rounded-xl bg-white py-5 mb-4 cursor-pointer">
          {verificationStatus === "pending" && ( // Voir avec Jojo pour les autres status
            <p className="text-light-yellow">En cours</p>
          )}
          {verificationStatus === "verified" && ( // Voir avec Jojo pour les autres status
            <p className="text-light-green bg-lighter-green py-2 px-[14px] border border-light-green rounded-3xl font-poppins font-medium">
              Compte validé
            </p>
          )}
          {firstName} <br />
          {lastName} <br />
          {dateOfBirth} <br />
        </div>
      </div>
    </div>
  );
}
