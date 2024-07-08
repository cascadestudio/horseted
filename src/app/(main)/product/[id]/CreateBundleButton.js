"use client";

import Button from "@/components/Button";

export default function CreateBundleButton({ onOpen }) {
  return (
    <>
      <Button onClick={onOpen} className="text-sm whitespace-nowrap h-8 ml-5">
        Créer un lot
      </Button>
    </>
  );
}
