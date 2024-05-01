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
