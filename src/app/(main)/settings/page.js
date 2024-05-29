"use client";

import { useAuthContext } from "@/context/AuthContext";

export default function SettingsPage() {
  const { me } = useAuthContext();

  return (
    <section>
      <h1>Paramètres</h1>
      {me.username}
    </section>
  );
}
