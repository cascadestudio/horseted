import Modal from "@/components/Modal";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";
import Image from "next/image";
import SigninForm from "@/app/(login)/signin/SigninForm";

export default function ReAuthModal({ setIsReAuthModal }) {
  return (
    <Modal
      isNotForm
      title="Confirmer identifiants"
      onClose={() => {
        setIsReAuthModal(false);
      }}
    >
      <a
        href="#"
        className="flex items-center border border-black w-fit rounded-[50px] p-1 ml-auto mr-auto"
      >
        <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
          <Image
            src={GoogleIcon}
            alt="Google Icon"
            className="h-5 w-5 lg:h-6 lg:w-6"
            priority
          />
        </div>
        <span className="font-semibold pl-3 pr-8 lg:pr-[70px] lg:pl-[38px] text-nowrap">
          Continuer avec Google
        </span>
      </a>
      <SigninForm className="border-none lg:pt-0 mt-0 lg:mb-10" />
    </Modal>
  );
}
