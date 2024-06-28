"use client";
import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";

import Button from "@/components/Button";

function AccountPage() {
  const { user } = useAuthContext();
  if (user)
    return (
      <>
        {user?.username}
        <br />
        {user?.description}
        <Button href="/parametres">Modifier mon profil</Button>
      </>
    );
}

export default withAuth(AccountPage);
