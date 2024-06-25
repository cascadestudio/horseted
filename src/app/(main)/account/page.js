"use client";
import { useAuthContext } from "@/context/AuthContext";
import Button from "@/components/Button";
export default function AccountPage() {
  const { user } = useAuthContext();
  return (
    <>
      {user.username}
      <br />
      {user.description}
      <Button href="/settings">Modifier mon profil</Button>
    </>
  );
}
