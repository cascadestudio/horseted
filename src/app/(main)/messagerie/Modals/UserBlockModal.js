import Modal from "@/components/Modal";
import OptionBlock from "@/components/input/OptionBlock";
import fetchHorseted from "@/utils/fetchHorseted";

export default function SignalementModal({
  accessToken,
  setIsUserBlockModal,
  userId,
  seller,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      blockedUserId: seller.id,
    };
    fetchHorseted(
      `/users/${userId}/blocked_users`,
      accessToken,
      "POST",
      body,
      true,
      true
    );
    setIsUserBlockModal(false);
  };

  return (
    <Modal
      title="Bloquer"
      onClose={() => {
        setIsUserBlockModal(false);
      }}
      buttonText="Bloquer"
      onSubmit={handleSubmit}
    >
      <p>Souhaitez-vous bloquer l’utilisateur {seller.username} ?</p>
    </Modal>
  );
}
