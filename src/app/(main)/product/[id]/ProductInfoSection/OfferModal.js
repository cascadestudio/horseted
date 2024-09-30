import Modal from "@/components/Modal";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { centsToEuros } from "@/utils/centsToEuros";
import Alert from "@/components/Alert";
import { postOffer } from "@/fetch/offers";

export default function OfferModal({
  price,
  onClose,
  products,
  offerId,
  isCounterOffer,
  orderId,
}) {
  const { accessToken } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);

  const displayPrice = centsToEuros(price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productIds = handleProductsIds();
    const offerPrice = parseFloat(e.target.offer.value) * 100;
    if (offerPrice > price) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      if (isCounterOffer) {
        await postOffer(accessToken, {
          orderId: orderId,
          price: offerPrice,
          declinedOfferId: offerId,
        });
      } else {
        await postOrder(productIds, offerPrice);
      }
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
      declinedOfferId: offerId || null,
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
        <Alert type="error">
          Vous ne pouvez pas faire une offre supérieure au montant de l’article
        </Alert>
      )}
    </Modal>
  );
}
