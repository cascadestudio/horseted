import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { formatNumber } from "@/utils/formatNumber";
import { shippingMethodTranslations } from "@/utils/translations";

export default function BundleShippingInfo({ products }) {
  const { accessToken } = useAuthContext();
  const [shippingMethods, setShippingMethods] = useState([]);

  useEffect(() => {
    if (accessToken && products.length) {
      getShippingMethods();
    } else {
      setShippingMethods([]);
    }
  }, [accessToken, products]);

  const getShippingMethods = async () => {
    const defaultAddress = await getDefaultAddresses();
    if (!defaultAddress) return;
    let query = `/delivery/shipping_methods`;
    query += `?postal_code=${defaultAddress.postalCode}`;
    query += `&product_ids=${products.map((product) => product.id).join(";")}`;
    const shippingMethods = await fetchHorseted(query, accessToken);
    setShippingMethods(shippingMethods);
  };

  const getDefaultAddresses = async () => {
    const addresses = await fetchHorseted(`/users/me/addresses`, accessToken);
    const defaultAddress = addresses.find((address) => address.isDefault);
    return defaultAddress;
  };

  if (!accessToken || !shippingMethods.length) return;

  const shippingMethodName =
    shippingMethodTranslations[shippingMethods[0].name] ||
    shippingMethods[0].name;

  return (
    <p>
      <span className="font-poppins font-medium text-sm">
        {formatNumber(shippingMethods[0].price)} €
      </span>
      <span className="text-sm"> - {shippingMethodName}</span>
    </p>
  );
}
