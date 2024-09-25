import Modal from "@/components/Modal";
import OptionBlock from "@/components/input/OptionBlock";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { TextInput } from "@/components/input";

export default function SignalementModal({
  setIsSignalementModal,
  sellerId,
  productId,
}) {
  const { accessToken } = useAuthContext();

  const signalementTypes = [
    "spam",
    "Arnaque",
    "Message insultant",
    "Note innapropriée",
  ];

  const [selectedType, setSelectedType] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const signalement = e.target.value;
    setSelectedType(signalement);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      type: selectedType,
      message: message,
      userId: sellerId || null,
      productId: productId || null,
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
      className="flex flex-col gap-y-7"
    >
      <TextInput
        label="Ajouter un message"
        name="message"
        type="textarea"
        placeholder="Votre Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <label className="font-mcqueen font-semibold" htmlFor="">
        <span className="leading-[30px]">Objet du signalement :</span>
        {signalementTypes.map((signalementType, index) => (
          <OptionBlock
            key={index}
            defaultValue={signalementType}
            onChange={handleChange}
            checked={selectedType === signalementType}
            className={`${
              selectedType === signalementType
                ? "border-light-green bg-white"
                : "border-grey"
            }`}
          >
            {signalementType}
          </OptionBlock>
        ))}
      </label>
    </Modal>
  );
}
