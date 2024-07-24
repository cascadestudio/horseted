"use client";

import PaymentMethods from "@/components/PaymentMethods";
import StripeProvider from "@/components/StripeProvider";
import { useState } from "react";

export default function page() {
  const [activePaymentMethodId, setActivePaymentMethodId] = useState(null);

  return (
    <StripeProvider>
      <PaymentMethods
        activePaymentMethodId={activePaymentMethodId}
        setActivePaymentMethodId={setActivePaymentMethodId}
      />
    </StripeProvider>
  );
}
