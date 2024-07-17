import Modal from "./Modal";

export default function SignInModal({ setIsSignInModal }) {
  return (
    <Modal
      title="Se connecter"
      onClose={() => {
        setIsSignInModal(false);
      }}
    >
      SignInModal
    </Modal>
  );
}
