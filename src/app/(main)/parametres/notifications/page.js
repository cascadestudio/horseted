"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import Toggle from "./Toggle";
import Spinner from "@/components/Spinner";

export default function Notifications() {
  const { accessToken } = useAuthContext();
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifNewMessagesEmail: true,
    notifReviewEmail: true,
    notifSaleEmail: true,
    notifOrderEmail: true,
    notifAppEmail: true,
  });

  const settingsData = [
    {
      label: "Nouveaux messages",
      name: "notifNewMessagesEmail",
    },
    {
      label: "Nouvelles évaluations",
      name: "notifReviewEmail",
    },
    {
      label: "Nouvelle vente",
      name: "notifSaleEmail",
    },
    {
      label: "Notifications de commande",
      name: "notifOrderEmail",
    },
    {
      label: "Notifications de l’application",
      name: "notifAppEmail",
    },
  ];

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    if (hasFormChanged) {
      patchSettings();
    }
  }, [settings]);

  async function getSettings() {
    setIsLoading(true);
    const settings = await fetchHorseted(`/users/me/settings`, accessToken);
    setSettings(settings);
    setIsLoading(false);
  }

  async function patchSettings() {
    await fetchHorseted(
      `/users/me/settings`,
      accessToken,
      "PATCH",
      settings,
      true
    );
  }

  const handleChange = (e) => {
    setHasFormChanged(true);
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col justify-center w-full lg:pt-14">
      <h1 className="text-[24px] font-mcqueen font-bold mt-4 lg:mt-0">
        Notifications par e-mail
      </h1>
      <form className="w-full">
        {settingsData.map(({ label, name }) => {
          const settingState = settings[name];
          return (
            <Toggle
              key={name}
              label={label}
              name={name}
              checked={settingState}
              setSettings={setSettings}
              handleChange={handleChange}
            />
          );
        })}
      </form>
      <p className="font-medium italic mt-4">
        Vous pouvez personnaliser les notifications de l’application dans les
        réglages de votre application sur votre mobile.
      </p>
    </div>
  );
}
