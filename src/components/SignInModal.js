import Modal from "./Modal";
import SigninForm from "@/app/(login)/signin/SigninForm";
import Button from "./Button";
import ExternalProviderLoginButton from "@/components/ExternalProviderLoginButton";

export default function SignInModal({ setIsSignInModal }) {
  return (
    <Modal
      isNotForm
      title="Se connecter"
      onClose={() => {
        setIsSignInModal(false);
      }}
      className="text-black"
    >
      <ExternalProviderLoginButton
        providerName="google"
        type="signin"
        setIsSignInModal={setIsSignInModal}
      />
      <SigninForm className="border-none lg:pt-0 mt-0 lg:mb-10" />
      <h2 className="font-mcqueen font-bold text-[22px] leading-[32px] text-center lg:text-[28px] lg:leading-[48px]">
        Inscription
      </h2>
      <p className="text-center mb-3 lg:text-[18px]">
        Vous n’avez pas de compte ?
      </p>
      <Button
        href="/signup"
        variant="transparent-green"
        className="w-full text-xl h-[52px] lg:w-[335px] lg:self-center"
      >
        S’inscrire
      </Button>
    </Modal>
  );
}
