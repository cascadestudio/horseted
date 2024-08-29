import { useState } from "react";
import ReAuthModal from "./ReAuthModal";

export default function DeleteAccountButton({ accessToken }) {
  const [isReAuthModal, setIsReAuthModal] = useState(false);

  return (
    <>
      <button
        className="delete-button font-semibold text-[12px] text-red"
        onClick={() => setIsReAuthModal(true)}
      >
        Supprimer mon compte et mes données
      </button>
      {isReAuthModal && (
        <ReAuthModal
          setIsReAuthModal={setIsReAuthModal}
          accessToken={accessToken}
        />
      )}
    </>
  );
}
