import { useEffect } from "react";
import capitalizeText from "@/utils/capitalizeText";

export default function ServicePoint({
  setActiveServicePoint,
  activeServicePoint,
}) {
  const { name, street, code, city, carrier, id } = activeServicePoint;

  useEffect(() => {
    const loadSendCloudScript = () => {
      const script = document.createElement("script");
      script.src = "https://embed.sendcloud.sc/spp/1.0.0/api.min.js";
      script.async = true;
      script.onload = () => {
        console.log("SendCloud script loaded successfully.");
      };
      document.body.appendChild(script);
    };

    if (!window.sendcloud) {
      loadSendCloudScript();
    }
  }, []);

  const handleOpenPicker = () => {
    if (window.sendcloud) {
      const options = {
        apiKey: "7e7b27f0-58d5-45da-8d71-9e765920d498",
        country: "fr",
        language: "fr-fr",
        servicePointId: parseInt(id),
      };

      window.sendcloud.servicePoints.open(
        options,
        successCallback,
        failureCallback
      );
    } else {
      console.error("SendCloud SDK not available");
    }
  };

  const successCallback = (servicePoint) => {
    setActiveServicePoint(servicePoint);
    // console.log("servicePoint =>", servicePoint);
  };

  const failureCallback = (errors) => {
    console.error("[Failure callback]", errors.join(", "));
  };

  return (
    <>
      <div>
        <h2 className="font-mcqueen font-bold text-xl mt-10 mb-2">
          Point relai :
        </h2>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-x-2">
              <img
                src={`/logos/${carrier}.svg`}
                width="15"
                height="15"
                alt={carrier}
              />
              <p className="font-semibold">{capitalizeText(name)}</p>
            </div>
            <p className="text-sm">
              {`${capitalizeText(street)}, ${code} ${capitalizeText(city)}`}
            </p>
          </div>
          <button
            className="text-dark-green underline"
            onClick={handleOpenPicker}
          >
            Changer le point relai
          </button>
        </div>
      </div>
    </>
  );
}
