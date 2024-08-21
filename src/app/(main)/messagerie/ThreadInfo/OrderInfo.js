import { ISOtoShortDate } from "@/utils/formatDate";

export default function OrderInfo({ order }) {
  return (
    <div className="p-5 border-dark-green border rounded-xl">
      {/* <p>Commande validée !</p>
  <p>La commande est validée et en attente de livraison.</p> */}
      <div className="flex items-center mb-3">
        <img src="/icons/delivery-check.svg" alt="" />
        <div className="ml-5">
          <p className="font-medium">Numéro de suivi colissimo créé</p>
          <a
            href={order.url}
            target="_blank"
            rel="noreferrer"
            className="relative"
          >
            <span className="font-bold font-poppins">{order.number}</span>
            <img
              className="relative top-[-6px] ml-[2px] inline-block"
              src="/icons/external-link.svg"
              alt=""
            />
          </a>
          <p className="text-sm font-poppins text-grey">
            {ISOtoShortDate(order.createdAt)}
          </p>
        </div>
      </div>
      {order.statuses[0].status === "readyToSend" && (
        <div className="flex items-center">
          <img src="/icons/delivery-check.svg" alt="" />
          <div className="ml-5">
            <p className="font-medium">Prêt à être livré</p>
            <p className="text-sm font-poppins text-grey">
              {ISOtoShortDate(order.statuses[0].updatedAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
