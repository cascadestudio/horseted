import { useState } from "react";
import ServicePointsModal from "./ServicePointsModal";
import capitalizeText from "@/utils/capitalizeText";
import Image from "next/image";

export default function ServicePoint({
  servicePoints,
  setActiveServicePoint,
  activeServicePoint,
}) {
  const [isServicePointsModal, setIsServicePointsModal] = useState(false);

  const { name, street, code, city, carrier } = activeServicePoint;

  return (
    <>
      <div>
        <h2 className="font-mcqueen font-bold text-xl mt-10 mb-2">
          Point relai :
        </h2>
        <div className="flex justify-between ">
          <div>
            <div className="flex gap-x-1">
              {carrier === "colissimo" && (
                <Image
                  src="/colissimo.svg"
                  width={15}
                  height={15}
                  alt="Colissimo"
                />
              )}
              <p className="font-semibold">{capitalizeText(name)}</p>
            </div>
            <p className="text-sm">
              {`${capitalizeText(street)}, ${code} ${capitalizeText(city)}`}
            </p>
          </div>
          <button
            className="text-dark-green underline"
            onClick={() => setIsServicePointsModal(true)}
          >
            Changer le point relai
          </button>
        </div>
      </div>
      {isServicePointsModal && (
        <ServicePointsModal
          servicePoints={servicePoints}
          setActiveServicePoint={setActiveServicePoint}
          setIsServicePointsModal={setIsServicePointsModal}
        />
      )}
    </>
  );
}
