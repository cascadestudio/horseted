import Modal from "@/components/Modal";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { centsToEuros } from "@/utils/centsToEuros";

export default function OfferModal({ price, onClose, products }) {
  const router = useRouter();
  const { accessToken } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);
  const [productIds, setProductIds] = useState([]);

  console.log("products =>", products);

  const displayPrice = centsToEuros(price);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productIds = handleProductsIds();
    console.log("productIds =>", productIds);
    const offer = parseFloat(e.target.offer.value) * 100;
    if (offer > price) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      postOrder(productIds, offer);
      // router.push(`/messagerie?productIds=${productIds.join(";")}`);
      router.push(`/messagerie`);
      onClose();
    }
  };

  const handleProductsIds = () => {
    if (Array.isArray(products)) {
      return products.map((product) => product.id);
    } else {
      return [products.id];
    }
  };

  async function postOrder(productIds, offer) {
    const body = {
      productIds: productIds,
      price: offer,
    };
    const order = await fetchHorseted(
      `/orders`,
      accessToken,
      "POST",
      body,
      true,
      true
    );
    return order.id;
  }

  return (
    <Modal
      title="Faire une offre"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Faire une offre"
    >
      <div className="mb-7">
        <label
          className="block font-mcqueen font-semibold mb-2"
          htmlFor="price"
        >
          Votre offre :
          <div className="flex items-center border-b border-black">
            <input
              required
              type="number"
              step="0.01"
              name="offer"
              id="offer"
              placeholder={displayPrice}
              className="border-none font-poppins text-[24px] leading-[48px] pb-0"
            />
            <span className="text-[24px] leading-[48px] font-semibold mr-2">
              €
            </span>
          </div>
        </label>
      </div>
      <p className="text-center">
        L’offre sera envoyée au vendeur, qui se réserve le droit de l’accepter,
        de la refuser ou de faire une contre-offre
      </p>
      {showAlert && (
        <div className="fixed inset-x-0 bottom-5 flex justify-center">
          <div className="bg-light-grey text-red mx-5 px-5 py-4 rounded-[20px] absolute bottom-5  lg:bottom-20 flex gap-8 items-center">
            <span className="text-xl lg:text-[36px] lg:leading-[48px] font-bold font-mcqueen text-center rounded-full aspect-square h-6 w-6 lg:h-[54px] lg:w-[54px] bg-red bg-opacity-10 border border-red flex items-center justify-center">
              !
            </span>
            <p className="text-center font-bold">
              Vous ne pouvez pas faire une offre supérieure au montant de
              l’article
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
