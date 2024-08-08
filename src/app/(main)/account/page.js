"use client";
import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Button from "@/components/Button";
import AvatarDisplay from "@/components/AvatarDisplay";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";

function AccountPage() {
  const { user } = useAuthContext();
  // Add fetchAvatar()
  if (user)
    return (
      <div className="container mx-auto pt-7 pb-12">
        <div className="flex gap-4 items-center">
          <AvatarDisplay avatarSrc={user?.avatar} className="h-32 w-32" />
          <div className="pt-12">
            <StarRating rating="4.5" count="6" />
            <p className="text-[22px] font-mcqueen font-semibold">
              {user?.username}
            </p>
            <div className="flex gap-2 items-center font-medium text-sm mb-4">
              <CityIcon className="w-3" />
              <p>Montpellier (34)</p>
            </div>
            {/* {user?.description} */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip
            </p>
          </div>
          <Button href="/parametres" className="lg:ml-36">
            Modifier mon profil
          </Button>
        </div>
      </div>
    );
}

export default withAuth(AccountPage);
