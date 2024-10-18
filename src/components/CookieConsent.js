"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "./Button";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookie-consent", "true", { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-green text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          Nous utilisons des cookies pour améliorer votre expérience sur notre
          site. En continuant, vous acceptez l’utilisation des cookies.
        </p>
        <Button variant="white" onClick={acceptCookies}>
          Accepter
        </Button>
      </div>
    </div>
  );
}
