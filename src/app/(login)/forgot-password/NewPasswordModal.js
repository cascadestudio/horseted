"use client";

import { useEffect, useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import Modal from "@/components/Modal";
import { TextInput } from "@/components/input";
import { useSearchParams } from "next/navigation";

export default function NewPasswordModal({ setAlert }) {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const apiKey = searchParams.get("apiKey");

  const [newPassword, setNewPassword] = useState("");
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (mode === "resetPassword" && oobCode && apiKey) {
      setIsModal(true);
    }
  }, [mode, oobCode, apiKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setAlert({
        type: "error",
        message: "Le mot de passe doit contenir au moins 6 caractères.",
      });
      return;
    }

    const auth = getAuth();

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setAlert({
        type: "success",
        message: "Votre mot de passe a été réinitialisé avec succès.",
      });
      setIsModal(false);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          "Erreur lors de la réinitialisation de votre mot de passe. Le lien peut être invalide ou expiré.",
      });
      console.error("Erreur de réinitialisation:", error);
    }
  };

  if (!isModal) return;

  return (
    <Modal
      title="Reinitialiser le mot de passe"
      onSubmit={handleSubmit}
      onClose={() => setIsModal(false)}
      buttonText="Reinitialiser le mot de passe"
    >
      <TextInput
        label="Nouveau mot de passe"
        placeholder="******"
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
    </Modal>
  );
}
