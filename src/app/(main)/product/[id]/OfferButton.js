// POST /orders c’est pour créer une commande, si tu veux faire une offre à la commande tu renseigne le champs “price”
// POST /orders/id/offers c’est pour faire une nouvelle offre si ton offre a été refusée
// POST /orders/{id}/payment c’est pour payer la commande, si tu veux payer au prix d’une offre qui a été acceptée il faut renseigner le champs “offerId”

"use client";

import Button from "@/components/Button";

export default function OfferButton({ onOpen, className }) {
  return (
    <>
      <Button
        onClick={onOpen}
        variant="transparent-green"
        className={`w-full flex justify-center h-[52px] text-xl ${className}`}
      >
        Faire une offre
      </Button>
    </>
  );
}
