"use client";

import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Button from "@/components/Button";
import ProfileInfo from "@/components/ProfilePage/ProfileInfo";
import ProfileTabs from "@/components/ProfilePage/ProfileTabs";

function AccountPage() {
  const { user, accessToken } = useAuthContext();

  return (
    <div className="container mx-auto pt-7 pb-12 px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <ProfileInfo profile={user} accessToken={accessToken} />
        <Button href="/parametres" className="lg:ml-36">
          Modifier mon profil
        </Button>
      </div>
      <ProfileTabs profile={user} accessToken={accessToken} />
    </div>
  );
}

export default withAuth(AccountPage);
