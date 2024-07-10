import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import OptionBlock from "@/components/input/OptionBlock";
import ServicePointsModal from "./ServicePointsModal";

export default function Delivery({
  activeAddress,
  productIds,
  shippingMethods,
  setShippingMethods,
  activeServicePointId,
  setActiveServicePointId,
  productSize,
}) {
  const { accessToken } = useAuthContext();
  const [servicePoints, setServicePoints] = useState([]);
  const [activeDeliveryMethod, setActiveDeliveryMethod] =
    useState("service_point");
  const [isServicePointsModal, setIsServicePointsModal] = useState(false);

  //  console.log("shippingMethods =>", shippingMethods);

  useEffect(() => {
    if (activeAddress && productIds) {
      getServicePoints();
      getShippingMethods();
    }
  }, [activeAddress, productIds]);

  useEffect(() => {
    if (activeServicePointId) {
      getShippingMethods();
    }
  }, [activeServicePointId]);

  function handleDeliveryMethod(e) {
    setActiveDeliveryMethod(e.target.value);
  }

  if (shippingMethods.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div className="g-block">
        <div className="flex justify-between">
          <h2 className="font-mcqueen font-bold text-xl mb-2">
            Options de livraison
          </h2>
          <p>{productSize}</p>
        </div>
        {shippingMethods.map((shippingMethod) => {
          const { id, name, price } = shippingMethod;
          return (
            <OptionBlock
              key={id}
              defaultValue={name}
              checked={activeDeliveryMethod === name}
              onChange={handleDeliveryMethod}
            >
              <p className="font-bold">{name}</p>
              <p>À partir de {price}€</p>
            </OptionBlock>
          );
        })}
        {servicePoints?.length > 0 && (
          <div>
            <h2 className="font-mcqueen font-bold text-xl mb-5">
              Point relai :
            </h2>
            <div className="flex justify-between">
              <div>{servicePoints[0].name}</div>
              <button
                className="text-dark-green underline"
                onClick={() => setIsServicePointsModal(true)}
              >
                Changer le point relai
              </button>
            </div>
          </div>
        )}
      </div>
      {isServicePointsModal && (
        <ServicePointsModal
          servicePoints={servicePoints}
          setActiveServicePointId={setActiveServicePointId}
          setIsServicePointsModal={setIsServicePointsModal}
        />
      )}
    </>
  );

  async function getServicePoints() {
    let query = `/delivery/service_points`;
    query += `?address_id=${activeAddress.id}`;
    query += `&location=${activeAddress.latitude};${activeAddress.longitude}`;
    query += `&product_ids=${productIds}`;
    const servicePoints = await fetchHorseted(query, accessToken);
    setServicePoints(servicePoints.slice(0, 10));
  }

  async function getShippingMethods() {
    let query = `/delivery/shipping_methods`;
    query += `?postal_code=${activeAddress.postalCode}`;
    query += `&product_ids=${productIds}`;
    if (activeServicePointId) query += `&service_point=${activeServicePointId}`;
    const shippingMethods = await fetchHorseted(query, accessToken);
    setShippingMethods(shippingMethods);
    // console.log("shippingMethods =>", shippingMethods);
  }
}
