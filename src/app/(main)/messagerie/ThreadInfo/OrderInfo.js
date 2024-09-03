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
      {orderTracking.statuses.map((status, index) => {
        if (status.status === "readyToSend") {
          return (
            <div key={index}>
              <p className="font-mcqueen text-lg font-bold text-light-green mb-1">
                Commande validée !
              </p>
              <p className="text-sm font-poppins font-medium mb-3">
                La commande est validée et en attente de livraison
                {userType === "seller" && " de votre part"}.
              </p>
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
              <p className="font-mcqueen text-lg font-bold text-light-green">
                Commande Livrée !
              </p>
              <Button onClick={handleIsReceived}>Confirmer la réception</Button>
            </div>
          );
        }
        if (status.status === "shipping") {
          return (
            <p className="text-sm font-poppins font-medium mb-3">
              Commande en cour de livraison
            </p>
          );
        }
        if (status.status === "availableAtServicePoint") {
          return (
            <p className="text-sm font-poppins font-medium mb-3">
              Disponible en point relais
            </p>
          );
        }
        if (status.status === "late") {
          return (
            <p className="text-sm font-poppins font-medium mb-3">
              Commande en retard
            </p>
          );
        }
      })}

      <div className="p-5 mt-3 border-dark-green border rounded-xl">
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
              <div key={index} className="flex items-center mb-3">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium">Prêt à être livré</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "delivered") {
            return (
              <div className="flex items-center bg-dark-green rounded-lg p-5 mx-[-20px] mb-[-20px] ">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium text-white">Commande livrée</p>
                  <p className="text-sm font-poppins text-pale-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "shipping") {
            return (
              <div className="flex items-center mb-3">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium">En cours de livraison</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "availableAtServicePoint") {
            return (
              <div className="flex items-center mb-3">
                <img src="/icons/delivery-check.svg" alt="" />
                <div className="ml-5">
                  <p className="font-medium">Disponible en point relais</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
                  </p>
                </div>
              </div>
            );
          }
          if (status.status === "late") {
            return (
              <div className="flex items-center mb-3">
                <div className="ml-10">
                  <p className="font-medium text-red-500">Commande en retard</p>
                  <p className="text-sm font-poppins text-grey">
                    {ISOtoShortDate(status.updatedAt)}
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
