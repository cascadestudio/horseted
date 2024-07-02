"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CreateBatchModal from "./CreateBatchModal";

export default function CreateBatchButton({ userData, userProducts }) {
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);

  const handleOpenCreateBatchModal = () => {
    setIsCreateBatchModalOpen(true);
  };

  const handleCloseCreateBatchModal = () => {
    console.log("CreateBatchModal closed");
    setIsCreateBatchModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenCreateBatchModal}
        className="text-sm whitespace-nowrap h-8 ml-5"
      >
        Créer un lot
      </Button>
      {isCreateBatchModalOpen && (
        <CreateBatchModal
          userData={userData}
          userProducts={userProducts}
          onClose={handleCloseCreateBatchModal}
        />
      )}
    </>
  );
}
