"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAuth, applyActionCode } from "firebase/auth";
import Alert from "@/components/Alert";

export default function EmailVerification() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const apiKey = searchParams.get("apiKey");

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (mode === "verifyEmail" && oobCode && apiKey) {
      setAlert({
        type: "info",
        message: "Vérification de votre e-mail, veuillez patienter...",
      });

      const auth = getAuth();

      applyActionCode(auth, oobCode)
        .then(() => {
          setAlert({
            type: "success",
            message: "Votre adresse e-mail a été vérifiée avec succès.",
          });
        })
        .catch((error) => {
          setAlert({
            type: "error",
            message:
              "Erreur lors de la vérification de votre adresse e-mail. Le lien peut être invalide ou expiré.",
          });
          console.error("Erreur de vérification:", error);
        });
    }
  }, [mode, oobCode, apiKey]);

  if (!alert) return null;

  return (
    <Alert type={alert.type} setAlert={setAlert} duration={10000}>
      {alert.message}
    </Alert>
  );
}
