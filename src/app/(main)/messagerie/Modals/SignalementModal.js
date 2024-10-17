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
    {
      value: "spam",
      label: "Spam",
    },
    {
      value: "Arnaque",
      label: "Arnaque",
    },
    {
      value: "Message insultant",
      label: "Message insultant",
    },
    {
      value: "Note innapropriée",
      label: "Note innapropriée",
    },
    {
      value: "order_issue",
      label: "Un problème avec une commande",
    },
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
        required
      />
      <label className="font-mcqueen font-semibold" htmlFor="">
        <span className="leading-[30px]">Objet du signalement :</span>
        {signalementTypes.map((signalementType, index) => (
          <OptionBlock
            required={true}
            key={index}
            defaultValue={signalementType.value}
            onChange={handleChange}
            checked={selectedType === signalementType.value}
            className={`${
              selectedType === signalementType.value
                ? "border-light-green bg-white"
                : "border-grey"
            }`}
          >
            {signalementType.label}
          </OptionBlock>
        ))}
      </label>
    </Modal>
  );
}
