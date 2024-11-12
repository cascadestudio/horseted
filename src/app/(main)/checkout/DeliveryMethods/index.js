import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import OptionBlock from "@/components/input/OptionBlock";
import ServicePoint from "./ServicePoint";
import { centsToEuros } from "@/utils/centsToEuros";
import {
  shippingMethodTranslations,
  shippingSizeTranslations,
} from "@/utils/translations";
import { getServicePoints, getShippingMethods } from "@/fetch/delivery";

export default function DeliveryMethods({
  activeAddress,
  productIds,
  shippingMethods,
  setShippingMethods,
  activeServicePoint,
  setActiveServicePoint,
  productSize,
  activeDeliveryMethod,
  setActiveDeliveryMethod,
}) {
  const { accessToken } = useAuthContext();
  const [servicePoints, setServicePoints] = useState([]);

  useEffect(() => {
    if (activeAddress && productIds) {
      handleGetServicePoints();
      handleGetShippingMethods();
    }
  }, [activeAddress, productIds]);

  async function handleGetServicePoints() {
    const servicePoints = await getServicePoints(
      activeAddress,
      productIds,
      accessToken
    );
    setServicePoints(servicePoints.slice(0, 10));
  }

  async function handleGetShippingMethods() {
    const shippingMethods = await getShippingMethods(
      activeAddress.postalCode,
      productIds,
      activeServicePoint?.id || null,
      accessToken
    );
    setShippingMethods(shippingMethods);
  }

  // useEffect(() => {
  //   if (activeServicePoint) {
  //     getShippingMethods();
  //   }
  // }, [activeServicePoint]);

  useEffect(() => {
    if (servicePoints.length > 0) {
      setActiveServicePoint(servicePoints[0]);
    }
  }, [servicePoints]);

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
              defaultValue={shippingMethod}
              checked={activeDeliveryMethod?.id === id}
              onChange={() => setActiveDeliveryMethod(shippingMethod)}
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
