import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import OptionBlock from "@/components/input/OptionBlock";
import ServicePoint from "./ServicePoint";
import { centsToEuros } from "@/utils/centsToEuros";
import {
  shippingMethodTranslations,
  shippingSizeTranslations,
} from "@/utils/translations";

export default function DeliveryMethods({
  activeAddress,
  productIds,
  shippingMethods,
  setShippingMethods,
  activeServicePoint,
  setActiveServicePoint,
  productSize,
  activeDeliveryMethodId,
  setActiveDeliveryMethodId,
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
    if (activeServicePoint) {
      getShippingMethods();
    }
  }, [activeServicePoint]);

  useEffect(() => {
    if (servicePoints.length > 0) {
      setActiveServicePoint(servicePoints[0]);
    }
  }, [servicePoints]);

  function handleDeliveryMethod(e) {
    setActiveDeliveryMethodId(Number(e.target.value));
  }

  async function getServicePoints() {
    let query = `/delivery/service_points`;
    query += `?address_id=${activeAddress.id}`;
    query += `&location=${activeAddress.latitude};${activeAddress.longitude}`;
    query += `&product_ids=${productIds.join(";")}`;
    const servicePoints = await fetchHorseted(query, accessToken);
    setServicePoints(servicePoints.slice(0, 10));
  }

  async function getShippingMethods() {
    let query = `/delivery/shipping_methods`;
    query += `?postal_code=${activeAddress.postalCode}`;
    query += `&product_ids=${productIds.join(";")}`;
    if (activeServicePoint) query += `&service_point=${activeServicePoint.id}`;
    const shippingMethods = await fetchHorseted(query, accessToken);
    setShippingMethods(shippingMethods);
  }

  return (
    <>
      <div className="g-block">
        <div className="flex justify-between">
          <h2 className="font-mcqueen font-bold text-xl mb-2">
            Options de livraison
          </h2>
          <p className="font-poppins font-medium text-sm">
            Taille du colis :{" "}
            {shippingSizeTranslations[productSize] || productSize}
          </p>
        </div>
        {shippingMethods.map((shippingMethod) => {
          const { id, name, price } = shippingMethod;
          return (
            <OptionBlock
              key={id}
              defaultValue={id}
              checked={activeDeliveryMethodId === id}
              onChange={handleDeliveryMethod}
            >
              <p className="font-bold">
                {shippingMethodTranslations[name] || name}
              </p>
              <p>À partir de {centsToEuros(price)} €</p>
            </OptionBlock>
          );
        })}
        {servicePoints?.length > 0 && activeServicePoint && (
          <ServicePoint
            servicePoints={servicePoints}
            setActiveServicePoint={setActiveServicePoint}
            activeServicePoint={activeServicePoint}
          />
        )}
      </div>
    </>
  );
}
