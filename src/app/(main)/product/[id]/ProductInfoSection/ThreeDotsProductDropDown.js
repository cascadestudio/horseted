import SignalementModal from "@/app/(main)/messagerie/Modals/SignalementModal";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { deleteProduct } from "@/fetch/products";
import { useRouter } from "next/navigation";

export default function ThreeDotsProductDropDown({ isUserSeller, product }) {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter();
  const [isSignalementModal, setIsSignalementModal] = useState(false);

  const handleDeleteProduct = async () => {
    await deleteProduct(accessToken, product);
    router.push("/mon-compte");
  };

  return (
    <>
      <div className="flex flex-col items-start bg-white border border-dark-grey rounded-lg p-4 font-semibold gap-3">
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
