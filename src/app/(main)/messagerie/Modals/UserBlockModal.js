import Modal from "@/components/Modal";
import fetchHorseted from "@/utils/fetchHorseted";

export default function SignalementModal({
  accessToken,
  setIsUserBlockModal,
  userId,
  recipient,
  recipientBlocked,
  setAlert,
  handleBlockedRecipient,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recipientBlocked) {
      await fetchHorseted(
        `/users/me/blocked_users/${recipientBlocked.id}`,
        accessToken,
        "DELETE"
      );
      setAlert("Vous avez débloqué cet utilisateur");
    } else {
      const body = {
        blockedUserId: recipient.id,
      };
      await fetchHorseted(
        `/users/${userId}/blocked_users`,
        accessToken,
        "POST",
        body,
        true,
        true
      );
      setAlert("Vous avez bloqué cet utilisateur");
    }
    handleBlockedRecipient();
    setIsUserBlockModal(false);
  };

  return (
    <Modal
      title={recipientBlocked ? "Débloquer" : "Bloquer"}
      onClose={() => {
        setIsUserBlockModal(false);
      }}
      buttonText={recipientBlocked ? "Débloquer" : "Bloquer"}
      onSubmit={handleSubmit}
    >
      <p>
        Souhaitez-vous {recipientBlocked ? "débloquer " : "bloquer "}
        l’utilisateur {recipient.username} ?
      </p>
    </Modal>
  );
}
