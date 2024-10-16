"use client";

import Button from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <div className="bg-light-grey">
        <div className="container mx-auto px-5 py-24 flex flex-col lg:py-44 items-center justify-center">
          <h1 className="font-mcqueen font-bold text-xl leading-[48px] lg:mb-3 lg:text-5xl ">
            Erreur
          </h1>
          <p className="text-center lg:text-lg mb-8">
            Désolé, mais on dirait qu'une erreur est survenue. Revenir à la page
            d’accueil.
          </p>
          <Button href="/">Retour accueil</Button>
        </div>
      </div>
    </>
  );
}
