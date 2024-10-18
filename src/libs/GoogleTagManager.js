"use client";

import { useEffect } from "react";

const GoogleTagManager = ({ gtmId }) => {
  useEffect(() => {
    if (!gtmId) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gtm.js",
      "gtm.start": new Date().getTime(),
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [gtmId]);

  return null;
};

export default GoogleTagManager;
