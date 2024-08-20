"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import Toggle from "@/components/input/Toggle";
import Spinner from "@/components/Spinner";

export default function VacationMode() {
  const { accessToken } = useAuthContext();
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    holidaysMode: true,
  });

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

  const handleChange = () => {
    setHasFormChanged(true);
    setSettings((prev) => ({ holidaysMode: !prev.holidaysMode }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col justify-center w-full lg:pt-14">
      <form className="w-full">
        <Toggle
          label="Activer le mode vacances"
          name="holidaysMode"
          checked={settings.holidaysMode}
          handleChange={handleChange}
        />
      </form>
      <p className="font-medium text-sm mt-4">
        Vous partez en vacances ? Activer le mode vacances pour désactiver
        provisoirement vos annonces.
      </p>
    </div>
  );
}
