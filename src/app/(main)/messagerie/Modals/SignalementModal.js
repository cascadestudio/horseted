import Modal from "@/components/Modal";
import OptionBlock from "@/components/input/OptionBlock";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";

export default function SignalementModal({
  setIsSignalementModal,
  accessToken,
  sellerId,
  productId,
}) {
  const signalementTypes = [
    "spam",
    "Arnaque",
    "Message insultant",
    "Note innapropriée",
  ];

  const [selectedType, setSelectedType] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    const signalement = e.target.value;
    setSelectedType(signalement);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("signalement", selectedType, message);
    const body = {
      type: selectedType,
      message: message,
      userId: sellerId,
      productId: productId,
    };
    fetchHorseted("/signalements", accessToken, "POST", body, true, true);
    setIsSignalementModal(false);
  };

  return (
    <Modal
      title="Signaler"
      onClose={() => {
        setIsSignalementModal(false);
      }}
      buttonText="Signaler"
      onSubmit={handleSubmit}
    >
      <label>
        Ajouter un message :
        <input
          type="text"
          placeholder="Votre Message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Objet du signalement :
        {signalementTypes.map((signalementType, index) => (
          <OptionBlock
            key={index}
            defaultValue={signalementType}
            onChange={handleChange}
            checked={selectedType === signalementType}
          >
            {signalementType}
          </OptionBlock>
        ))}
      </label>
    </Modal>
  );
}
