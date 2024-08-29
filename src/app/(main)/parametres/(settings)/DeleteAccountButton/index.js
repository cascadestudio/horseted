import React, { useState } from "react";
import ReAuthModal from "./ReAuthModal";

export default function DeleteAccountButton() {
  const [isReAuthModal, setIsReAuthModal] = useState(false);

  const handleDeleteAccount = async () => {
    await deleteFirebaseUser();
    await fetchHorseted(`/users/me`, accessToken, "DELETE", null, false, true);
    router.push("/");
  };

  return (
    <>
      <button
        className="delete-button font-semibold text-[12px] text-red"
        onClick={() => setIsReAuthModal(true)}
      >
        Supprimer mon compte et mes données
      </button>
      {isReAuthModal && <ReAuthModal setIsReAuthModal={setIsReAuthModal} />}
    </>
  );
}
