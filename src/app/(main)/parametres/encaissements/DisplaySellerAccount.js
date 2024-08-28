import React from "react";
import { useState } from "react";
import { ISOtoShortDate } from "@/utils/formatDate";
import Image from "next/image";
import CNIImageRecto from "@/assets/images/cni-recto.jpg";
import CNIImageVerso from "@/assets/images/cni-verso.jpg";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

//export default function DisplaySellerAccount() {
export default function DisplaySellerAccount({ sellerData }) {
  // const sellerData = {
  //   ibanLast4: "123",
  //   address: {
  //     city: "Paris",
  //     postalCode: "75001",
  //     street: "15 Rue de Rivoli",
  //   },
  //   dateOfBirth: "1990-01-01",
  //   firstName: "John",
  //   lastName: "Doe",
  //   verificationStatus: "verified",
  // };
  const {
    ibanLast4,
    address,
    dateOfBirth,
    firstName,
    lastName,
    verificationStatus,
  } = sellerData;

  // console.log("sellerData =>", sellerData);

  const [isModal, setIsModal] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:pt-5 lg:grid-cols-2 lg:gap-x-14 gap-y-4 mt-5 lg:mt-0">
      <div className="col-span-2 lg:col-span-1 flex flex-col mb-8 lg:mb-0">
        <h2 className="font-mcqueen text-[24px] font-bold">
          Informations vendeur
        </h2>
        <div className="border-b border-black lg:mt-8 pb-2">
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
        <div className="flex flex-col gap-2 items-center justify-center p-9 w-full border border-light-green border-dashed rounded-xl bg-white py-5 cursor-pointer">
          {/* Ajouter status "non valide" */}
          {verificationStatus === "pending" && ( // Voir avec Jojo pour les autres status
            <p className="text-dark-yellow bg-lighter-yellow py-2 px-[14px] border border-light-yellow rounded-3xl font-poppins font-medium mb-3">
              En cours
            </p>
          )}
          {verificationStatus === "verified" && ( // Voir avec Jojo pour les autres status
            <p className="text-light-green bg-lighter-green py-2 px-[14px] border border-light-green rounded-3xl font-poppins font-medium mb-3">
              Compte validé
            </p>
          )}
          <p className="rounded-md border border-lighter-grey p-4 w-full font-mcqueen font-semibold text-lg">
            {firstName} {lastName}
          </p>
          <p className="rounded-md border border-lighter-grey p-4 w-full font-poppins font-semibold">
            {ISOtoShortDate(dateOfBirth)}
          </p>
          <div className="flex gap-1 my-2">
            {/* TODO Ajouter les images dynamiques */}
            <Image src={CNIImageRecto} width={185} height={115} alt="recto" />
            <Image src={CNIImageVerso} width={185} height={115} alt="verso" />
          </div>
          <p className="text-sm text-red font-medium">Non modifiable</p>
        </div>
        {verificationStatus === "pending" && (
          <p className="text-center font-medium text-sm mt-5">
            <a href="/contact" className="text-light-green underline">
              Contactez-nous
            </a>{" "}
            pour modifier ces informations
          </p>
        )}
        {/* TODO Ajouter logique suppression compte */}
        {verificationStatus === "verified" && (
          <Button
            onClick={() => setIsModal(true)}
            className="mt-4 bg-red text-xhite w-full"
          >
            Supprimer mon profil vendeur
          </Button>
        )}
      </div>
      {isModal && (
        <Modal
          open={isModal}
          onClose={() => setIsModal(false)}
          buttonText="Supprimer mon profil vendeur"
          title="Êtes-vous sûr ?"
        />
      )}
    </div>
  );
}
