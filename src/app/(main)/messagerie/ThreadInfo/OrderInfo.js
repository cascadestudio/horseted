import Button from "@/components/Button";
import fetchHorseted from "@/utils/fetchHorseted";
import { ISOtoShortDate } from "@/utils/formatDate";

export default function OrderInfo({
  orderTracking,
  userType,
  accessToken,
  orderId,
}) {
  console.log("orderTracking =>", orderTracking);

  const handleIsReceived = async () => {
    const query = `/orders/${orderId}`;
    const body = {
      received: true,
    };
    await fetchHorseted(query, accessToken, "PATCH", body, true, true);
  };

  return (
    <>
      <p>Commande validée !</p>
      <p>
        La commande est validée et en attente de livraison
        {userType === "seller" && " de votre part"}.
      </p>
      <div className="p-5 border-dark-green border rounded-xl">
        {orderTracking.statuses.map((status, index) => {
          if (status.status === "readyToSend") {
            return (
              <div key={index}>
                <Button onClick={handleIsReceived}>
                  Confirmer la réception (test)
                </Button>
                {/* Pas à cette étape mais pour tester */}
              </div>
            );
          }
          if (status.status === "delivered") {
            return (
              <div>
                <Button onClick={handleIsReceived}>
                  Confirmer la réception
                </Button>
                <p>Commande Livrée !</p>;
              </div>
            );
          }
          if (status.status === "shipping") {
            return <p>Commande en cour de livraison !</p>;
          }
          if (status.status === "availableAtServicePoint") {
            return <p>Disponible en point relais !</p>;
          }
          if (status.status === "late") {
            return <p>Commande en retard !</p>;
          }
        })}

        <div className="flex items-center mb-3">
          <img src="/icons/delivery-check.svg" alt="" />
          <div className="ml-5">
            <p className="font-medium">Numéro de suivi colissimo créé</p>
            <a
              href={orderTracking.url}
              target="_blank"
              rel="noreferrer"
              className="relative"
            >
              <span className="font-bold font-poppins">
                {orderTracking.number}
              </span>
              <img
                className="relative top-[-6px] ml-[2px] inline-block"
                src="/icons/external-link.svg"
                alt=""
              />
            </a>
            <p className="text-sm font-poppins text-grey">
              {ISOtoShortDate(orderTracking.createdAt)}
            </p>
          </div>
        </div>
        {orderTracking.statuses.map((status, index) => {
          if (status.status === "readyToSend") {
            return (
              <div key={index} className="flex items-center">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium">Prêt à être livré</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(orderTracking.statuses[0].updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
