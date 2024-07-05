import Modal from "@/components/Modal";
import Button from "@/components/Button";
import ClientProductImage from "@/components/ClientProductImage";
import { formatNumber } from "@/utils/formatNumber";
import OfferButton from "../OfferButton";

export default function BundleSummaryModal({
  bundle,
  onClose,
  bundlePrice,
  shippingPrice,
}) {
  return (
    <Modal title="Votre lot" onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <span>{bundle.length} Articles</span>
        <div className="flex space-x-2">
          {bundle.map((product) => (
            <ClientProductImage
              product={product}
              key={product.id}
              className="w-10 h-12 mr-1 hidden lg:block"
              size="small"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <span>Commande</span>
        <span>{formatNumber(bundlePrice)} €</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Frais de port</span>
        <span>{formatNumber(shippingPrice)} €</span>
      </div>
      <div className="flex justify-between font-bold mb-6">
        <span>Total</span>
        <span>{formatNumber(bundlePrice + shippingPrice)} €</span>
      </div>
      <Button href="/checkout" className="w-full h-[52px] mb-2 text-xl">
        Acheter
      </Button>
      <OfferButton price={bundlePrice} className="mb-2" />
      <Button variant="transparent-green" className="w-full h-[52px] text-xl">
        Envoyer un message
      </Button>
    </Modal>
  );
}
