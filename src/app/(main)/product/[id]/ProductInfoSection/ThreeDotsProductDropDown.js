import SignalementModal from "@/app/(main)/messagerie/Modals/SignalementModal";
import { useState } from "react";

export default function ThreeDotsProductDropDown({ isUserSeller, product }) {
  const [isSignalementModal, setIsSignalementModal] = useState(false);

  const handleDeleteProduct = async () => {
    // TODO in API
  };

  return (
    <>
      <div className="flex flex-col items-start bg-white border border-dark-grey rounded-lg p-4 font-semibold gap-3 w-full">
        {isUserSeller ? (
          <button
            onClick={handleDeleteProduct}
            className="flex items-center gap-2"
          >
            <img src="/icons/supprimer-conversation.svg" alt="" />
            Supprimer le produit
          </button>
        ) : (
          <button
            onClick={() => setIsSignalementModal(!isSignalementModal)}
            className="flex items-center gap-2"
          >
            <img src="/icons/signaler.svg" alt="" />
            Signaler
          </button>
        )}
      </div>
      {isSignalementModal && (
        <SignalementModal
          setIsSignalementModal={setIsSignalementModal}
          productId={product.id}
        />
      )}
    </>
  );
}
