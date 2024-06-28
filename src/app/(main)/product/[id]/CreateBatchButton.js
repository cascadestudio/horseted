"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CreateBatchModal from "./CreateBatchModal";

export default function CreateBatchButton() {
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);

  const handleOpenCreateBatchModal = () => {
    setIsCreateBatchModalOpen(true);
  };

  const handleCloseCreateBatchModal = () => {
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
        <CreateBatchModal onClose={handleCloseCreateBatchModal} />
      )}
    </>
  );
}
