import { useEffect, useState } from "react";
import CitySelect from "./CitySelect";
import DisplayCity from "./DisplayCity";
import { useAuthContext } from "@/context/AuthContext";
import { getAddresses } from "@/fetch/addresses";

export default function index() {
  const { user, accessToken } = useAuthContext();
  const [addresses, setAddresses] = useState([]);

  console.log("addresses =>", addresses);

  useEffect(() => {
    handleAddresses();
  }, []);

  async function handleAddresses() {
    const adresses = await getAddresses(accessToken);
    setAddresses(adresses);
  }

  if (addresses.length === 0) return;

  return (
    <>
      <CitySelect />
      <DisplayCity accessToken={accessToken} />
    </>
  );
}
