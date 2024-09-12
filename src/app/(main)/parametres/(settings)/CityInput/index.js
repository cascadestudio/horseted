import { useEffect, useState } from "react";
import CitySelect from "./CitySelect";
import DisplayCity from "./DisplayCity";
import { useAuthContext } from "@/context/AuthContext";
import { getAddresses } from "@/fetch/addresses";

export default function index() {
  const { accessToken } = useAuthContext();
  const [shippingAddress, setShippingAddress] = useState({});

  //   console.log("shippingAddressCity =>", shippingAddressCity);

  useEffect(() => {
    handleAddresses();
  }, []);

  async function handleAddresses() {
    const addresses = await getAddresses(accessToken);
    const shippingAddress = addresses
      .filter((address) => address.type === "shipping")
      .sort((a, b) => b.isDefault - a.isDefault)[0];
    setShippingAddress(shippingAddress);
  }

  if (!shippingAddress) return;

  return (
    <>
      <CitySelect shippingAddress={shippingAddress} />
      <DisplayCity accessToken={accessToken} />
    </>
  );
}
