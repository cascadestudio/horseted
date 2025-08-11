"use client";

import DeleteIcon from "@/assets/icons/DeleteIcon";
import ModifyIcon from "@/assets/icons/ModifyIcon";
import fetchHorseted from "@/utils/fetchHorseted";

export default function AddressCard({
  address,
  accessToken,
  handleGetAddresses,
}) {
  const { id, houseNumber, street, postalCode, city, additionalInfos, isDefault } = address;

  async function deleteAddress(addressId) {
    const query = `/users/me/addresses/${addressId}`;
    await fetchHorseted(query, accessToken, "DELETE", null, false, true);
    handleGetAddresses();
  }

  return (
    <div
      className={`bg-white rounded-xl p-5 border  lg:col-start-1 flex justify-between items-center h-[90px] min-w-[335px] w-full ${
        isDefault ? "border-light-green" : "border-lighter-grey"
      }`}
      key={id}
    >
      <div className="text-sm">
        <p>{[houseNumber, street].filter(el => el).join(" ")}</p>
        <p>
          {postalCode} {city}
        </p>
        <p>{additionalInfos}</p>
      </div>
      <div className="flex gap-2">
        {/* <button>
          <ModifyIcon className="w-9 h-9" />
        </button> */}
        <button onClick={() => deleteAddress(id)}>
          <DeleteIcon className="w-9 h-9 text-red" />
        </button>
      </div>
    </div>
  );
}
