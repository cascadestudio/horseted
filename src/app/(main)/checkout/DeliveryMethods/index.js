import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import OptionBlock from "@/components/input/OptionBlock";
import ServicePoint from "./ServicePoint";
import replace from "lodash/replace";

import { shippingSizeTranslations } from "@/utils/translations";
import { getServicePoints, getShippingMethods } from "@/fetch/delivery";

export default function DeliveryMethods({
  activeAddress,
  productIds,
  shippingMethods,
  setShippingMethods,
  activeServicePoint,
  setActiveServicePoint,
  productSize,
  selectedShippingMethod,
  setSelectedShippingMethod,
}) {
  console.log("shippingMethods =>", shippingMethods);

  const { accessToken } = useAuthContext();
  const [servicePoints, setServicePoints] = useState([]);

  useEffect(() => {
    if (activeAddress && productIds) {
      handleGetServicePoints();
    }
  }, [activeAddress, productIds]);

  async function handleGetServicePoints() {
    const servicePoints = await getServicePoints(
      activeAddress,
      productIds,
      accessToken
    );
    setServicePoints(servicePoints.slice(0, 10));
    setActiveServicePoint(servicePoints[0]);
  }

  useEffect(() => {
    if (activeServicePoint) {
      handleGetShippingMethods();
    }
  }, [activeServicePoint]);

  async function handleGetShippingMethods() {
    const servicePointShippingMethods = await getShippingMethods(
      activeAddress.postalCode,
      productIds,
      activeServicePoint.id,
      accessToken
    );
    const homeShippingMethods = await getShippingMethods(
      activeAddress.postalCode,
      productIds,
      null,
      accessToken
    );
    // console.log("servicePointShippingMethods =>", servicePointShippingMethods);
    // console.log("homeShippingMethods =>", homeShippingMethods);
    setShippingMethods({
      servicePoint: servicePointShippingMethods,
      home: homeShippingMethods,
    });
  }

  // const handleShippingPrice = () => {
  //   replace(shippingMethods[0].price, ".", ",")
  // }

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
        {shippingMethods && (
          <>
            <OptionBlock
              checked={selectedShippingMethod === "servicePoint"}
              onChange={() => setSelectedShippingMethod("servicePoint")}
            >
              <p className="font-bold">Envoi en Point relais</p>
              <p>
                À partir de{" "}
                {replace(shippingMethods.servicePoint[0].price, ".", ",")} €
              </p>
            </OptionBlock>
            <OptionBlock
              checked={selectedShippingMethod === "home"}
              onChange={() => setSelectedShippingMethod("home")}
            >
              <p className="font-bold">Envoi à domicile</p>
              <p>
                À partir de {replace(shippingMethods.home[0].price, ".", ",")} €
              </p>
            </OptionBlock>
          </>
        )}

        {servicePoints?.length > 0 &&
          activeServicePoint &&
          selectedShippingMethod === "servicePoint" && (
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
