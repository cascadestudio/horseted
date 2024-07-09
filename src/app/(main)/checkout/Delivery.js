import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import OptionBlock from "@/components/input/OptionBlock";

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
    <div className="g-block">
      <div className="flex justify-between">
        <h2 className="font-mcqueen font-bold text-xl mb-5">
          Options de livraison
        </h2>
        <p>{productSize}</p>
      </div>
      <OptionBlock
        defaultValue="service_point"
        checked={activeDeliveryMethod === "service_point"}
        onChange={handleDeliveryMethod}
      >
        <p className="font-bold">Envoi en Point relais</p>
        <p>À partir de {shippingMethods[0].price}€</p>
      </OptionBlock>
      <OptionBlock
        defaultValue="home"
        checked={activeDeliveryMethod === "home"}
        onChange={handleDeliveryMethod}
      >
        <p className="font-bold">Envoi à domicile</p>
        <p>À partir de {shippingMethods[0].price}€</p>
      </OptionBlock>

      {shippingMethods.map((shippingMethod) => {
        return <p key={shippingMethod.id}>{shippingMethod.name}</p>;
      })}

      <h2 className="font-mcqueen font-bold text-xl mb-5">Point relai :</h2>
      {servicePoints?.length > 0 ? (
        servicePoints.map((servicePoint) => {
          return (
            <button
              onClick={() => setActiveServicePointId(servicePoint.id)}
              key={servicePoint.id}
            >
              {servicePoint.name}
            </button>
          );
        })
      ) : (
        <p>Aucun point relai</p>
      )}
    </div>
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
    console.log("shippingMethods =>", shippingMethods);
  }
}
