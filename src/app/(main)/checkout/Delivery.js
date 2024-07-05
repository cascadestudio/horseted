import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";

export default function Delivery({ activeAddress, productIds }) {
  const { accessToken } = useAuthContext();
  const [servicePoints, setServicePoints] = useState([]);
  const [activeServicePoint, setActiveServicePoint] = useState([]);

  useEffect(() => {
    if (activeAddress && productIds) {
      getServicePoints();
      // getShippingMethods();
    }
  }, [activeAddress, productIds]);

  return (
    <div>
      <h2 className="font-mcqueen font-bold text-xl mb-5">
        Options de livraison
      </h2>

      <h2 className="font-mcqueen font-bold text-xl mb-5">Point relai :</h2>
      {servicePoints?.length > 0 ? (
        servicePoints.map((servicePoint) => {
          return <p key={servicePoint.id}>{servicePoint.name}</p>;
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
    query += `&service_point=${activeServicePoint.id}`;
    const servicePoints = await fetchHorseted(query, accessToken);
    setServicePoints(servicePoints.slice(0, 10));
    // console.log("servicePoints =>", servicePoints);
  }
}
