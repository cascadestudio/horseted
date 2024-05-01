// POST /orders c’est pour créer une commande, si tu veux faire une offre à la commande tu renseigne le champs “price”
// POST /orders/id/offers c’est pour faire une nouvelle offre si ton offre a été refusée
// POST /orders/{id}/payment c’est pour payer la commande, si tu veux payer au prix d’une offre qui a été acceptée il faut renseigner le champs “offerId”

"use client";

import Button from "@/components/Button";
import OfferModal from "./OfferModal";
import { useState } from "react";

export default function ProductSection({ product }) {
  const {
    title,
    price,
    userId,
    description,
    status,
    createdAt,
    shipping,
    brand,
    material,
    favoritCount,
    color,
    category,
    state,
  } = product;

  const [isOfferModal, setIsOfferModal] = useState(false);

  return (
    <section>
      <h1>{title}</h1>
      <p>{price} €</p>
      <Button href="/checkout">Acheter</Button>
      <Button onClick={() => setIsOfferModal(true)} variant="transparent">
        Faire une offre
      </Button>
      {isOfferModal && <OfferModal />}
    </section>
  );
}
