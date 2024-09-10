"use client";

import AvatarDisplay from "@/components/AvatarDisplay";
import { useEffect, useState } from "react";
import CityIcon from "@/assets/icons/CityIcon";
import StarRating from "@/components/StarRating";
import fetchHorseted from "@/utils/fetchHorseted";

export default function ProfileInfo({ profile, accessToken }) {
  const [location, setLocation] = useState({
    city: "",
    code: "",
  });

  // console.log("profile =>", profile);

  useEffect(() => {
    // getCity();
    setLocation({ city: profile.city, code: "75" }); // TODO: voir avec Jonas comment gérer la ville
  }, []);

  const getCity = async () => {
    const addresses = await fetchHorseted(
      `/users/${profile.id}/addresses`,
      accessToken
    );
    const shippingAddresses = addresses.find(
      (address) => address.type === "shipping"
    );
    let defaultAddress = {};
    let city = "";
    let code = "";
    if (Array.isArray(shippingAddresses)) {
      defaultAddress = shippingAddresses.find(
        (address) => address.isDefault === true
      );
      if (defaultAddress) {
        city = defaultAddress.city;
        code = defaultAddress.postalCode;
      } else {
        city = shippingAddresses[0].city;
        code = shippingAddresses[0].postalCode;
      }
    } else {
      city = shippingAddresses.city;
      code = shippingAddresses.postalCode;
    }
    setLocation({
      city,
      code: code.slice(0, 2),
    });
  };

  return (
    <div className="flex items-center">
      <AvatarDisplay avatar={profile.avatar} size={130} />
      <div className="flex flex-col items-center lg:items-start ms-7">
        <StarRating rating="4.5" count="6" />
        <p className="text-[22px] font-mcqueen font-semibold">
          {profile.username}
        </p>
        {location.city && location.code && (
          <div className="flex gap-2 items-center font-medium text-sm mb-4">
            <CityIcon className="w-3 stroke-current fill-none" />
            <p>
              {location.city} ({location.code})
            </p>
          </div>
        )}
        <p className="text-sm leading-6">{profile.description}</p>
      </div>
    </div>
  );
}
