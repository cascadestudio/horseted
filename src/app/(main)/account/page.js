"use client";
import { useAuthContext } from "@/context/AuthContext";
import Button from "@/components/Button";
export default function AccountPage() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <>
      {user.username}
      <Button href="/settings">Modifier mon profil</Button>
    </>
  );
}
