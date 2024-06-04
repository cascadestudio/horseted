"use client";
import { useAuthContext } from "@/context/AuthContext";
import Button from "@/components/Button";
export default function AccountPage() {
  const { me } = useAuthContext();
  return (
    <>
      {me.username}
      <Button href="/settings">Modifier mon profil</Button>
    </>
  );
}
