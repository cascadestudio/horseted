import AddressModal from "./SellerAddressModal";
import { useState } from "react";

export default function SellerAdress({
  setStripeAccountForm,
  address,
  isAdressValid,
  setIsAdressValid,
}) {
  const [isModal, setIsModal] = useState(false);

  if (isAdressValid) {
    return (
      <div>
        {address.line1}
        <br />
        {address.postal_code}
        {address.city}
      </div>
    );
  } else {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsModal(true)}
          className="flex items-center py-3 px-5 pl-0 mb-5 bg-light-grey w-full"
        >
          <span className="mr-5 w-10 h-10 flex items-center justify-center bg-white border border-light-green rounded-full text-4xl text-light-green">
            +
          </span>
          Ajouter une adresse
        </button>
        {isModal && (
          <AddressModal
            address={address}
            setStripeAccountForm={setStripeAccountForm}
            setIsModal={setIsModal}
            setIsAdressValid={setIsAdressValid}
          />
        )}
      </>
    );
  }
}
