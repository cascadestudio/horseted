import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { formatNumber } from "@/utils/formatNumber";

export default function ShippingInfo({ product }) {
  const { accessToken } = useAuthContext();
  const [shippingMethods, setShippingMethods] = useState([]);

  useEffect(() => {
    if (accessToken) {
      getShippingMethods();
    }
  }, [accessToken]);

  const getShippingMethods = async () => {
    const defaultAddress = await getDefaultAddresses();
    if (!defaultAddress) return;
    let query = `/delivery/shipping_methods`;
    query += `?postal_code=${defaultAddress.postalCode}`;
    query += `&product_ids=${product.id}`;
    const shippingMethods = await fetchHorseted(query, accessToken);
    setShippingMethods(shippingMethods);
  };

  const getDefaultAddresses = async () => {
    const addresses = await fetchHorseted(`/users/me/addresses`, accessToken);
    const defaultAddress = addresses.find((address) => address.isDefault);
    return defaultAddress;
  };

  const getShippingMethodDisplayName = (methodName) => {
    switch (methodName) {
      case "Unstamped letter":
        return "Lettre non affranchie";
      default:
        return methodName;
    }
  };

  if (!accessToken || !shippingMethods.length)
    return <div className="h-4"></div>;

  const shippingMethodName = getShippingMethodDisplayName(
    shippingMethods[0].name
  );

  return (
    <p className="font-poppins text-light-green text-sm mb-2">
      {formatNumber(shippingMethods[0].price)} €{" "}
      <span className="font-sans">- {shippingMethodName}</span>
    </p>
  );
}
