import Modal from "@/components/Modal";
import Image from "next/image";
import Button from "@/components/Button";

export default function BatchSummaryModal({ batch, onClose }) {
  const totalPrice = batch.reduce((total, product) => total + product.price, 0);
  const shippingPrice = batch.reduce(
    (max, product) => Math.max(max, product.shipping),
    0
  );

  return (
    <Modal title="Votre lot" onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <span>{batch.length} Articles</span>
        <div className="flex space-x-2">
          {batch.map((product) => (
            <Image
              key={product.id}
              src={product.image}
              alt={product.title}
              width={40}
              height={40}
              className="rounded"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <span>Commande</span>
        <span>{totalPrice.toFixed(2)} €</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Frais de port</span>
        <span>{shippingPrice.toFixed(2)} €</span>
      </div>
      <div className="flex justify-between font-bold mb-6">
        <span>Total</span>
        <span>{(totalPrice + shippingPrice).toFixed(2)} €</span>
      </div>
      <Button className="w-full mb-2">Acheter</Button>
      <Button variant="transparent-green" className="w-full mb-2">
        Faire une Offre
      </Button>
      <Button variant="transparent-green" className="w-full">
        Envoyer un message
      </Button>
    </Modal>
  );
}
