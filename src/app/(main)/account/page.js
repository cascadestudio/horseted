"use client";
import { useAuthContext } from "@/context/AuthContext";
import Button from "@/components/Button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AccountPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  if (user)
    return (
      <>
        {user?.username}
        <br />
        {user?.description}
        <Button href="/settings">Modifier mon profil</Button>
      </>
    );
}
