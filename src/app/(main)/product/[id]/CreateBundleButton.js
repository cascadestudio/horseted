"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CreateBundleModal from "./CreateBundleModal";

export default function CreateBundleButton({ userData, userProducts }) {
  const [isCreateBundleModalOpen, setIsCreateBundleModalOpen] = useState(false);

  const handleOpenCreateBundleModal = () => {
    setIsCreateBundleModalOpen(true);
  };

  const handleCloseCreateBundleModal = () => {
    console.log("CreateBundleModal closed");
    setIsCreateBundleModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenCreateBundleModal}
        className="text-sm whitespace-nowrap h-8 ml-5"
      >
        Créer un lot
      </Button>
      {isCreateBundleModalOpen && (
        <CreateBundleModal
          userData={userData}
          userProducts={userProducts}
          onClose={handleCloseCreateBundleModal}
        />
      )}
    </>
  );
}
