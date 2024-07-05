import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

export default function Delivery({
  activeAddress,
  productIds,
  shippingMethods,
  setShippingMethods,
  activeServicePointId,
  setActiveServicePointId,
}) {
  const { accessToken } = useAuthContext();
  const [servicePoints, setServicePoints] = useState([]);

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

  return (
    <div>
      <h2 className="font-mcqueen font-bold text-xl mb-5">
        Options de livraison
      </h2>
      {shippingMethods?.length > 0 ? (
        shippingMethods.map((shippingMethod) => {
          return <p key={shippingMethod.id}>{shippingMethod.name}</p>;
        })
      ) : (
        <p>Aucune option de livraison</p>
      )}
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
    // console.log("shippingMethods =>", shippingMethods);
  }
}
