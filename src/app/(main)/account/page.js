"use client";
import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Button from "@/components/Button";
import AvatarDisplay from "@/components/AvatarDisplay";

function AccountPage() {
  const { user } = useAuthContext();
  // Add fetchAvatar()
  if (user)
    return (
      <>
        <div>
          <AvatarDisplay avatarSrc={user?.avatar} />
          {user?.username}
          {user?.description}
          <Button href="/parametres">Modifier mon profil</Button>
        </div>
      </>
    );
}

export default withAuth(AccountPage);
