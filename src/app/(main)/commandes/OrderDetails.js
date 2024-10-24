export default function OrderDetails({ purchaseOrSale }) {
  console.log("purchaseOrSale =>", purchaseOrSale);
  const { product, cavalier, order } = purchaseOrSale;

  return (
    <>
      <div>N° de commande : {order.id}</div>;<div>N° de commande : 65488</div>;
    </>
  );
}
