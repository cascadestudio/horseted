"use client";

// TODO: Fetch reviews
const reviews = [
  {
    avatarSrc: "https://i.pravatar.cc/300",
    author: "John Doe",
    date: "Il y a 3 jours",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    author: "John Doe",
    date: "Il y a 3 jours",
    rating: 4.5,
    comment: "",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    author: "Jane Doe",
    date: "Il y a 2 jours",
    rating: 5,
    comment:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    author: "Alice Smith",
    date: "Il y a 5 jours",
    rating: 4,
    comment:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    author: "Alice Smith",
    date: "Il y a 5 jours",
    rating: 4,
    comment: "",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    author: "Alice Smith",
    date: "Il y a 5 jours",
    rating: 4,
    comment: "",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    author: "Bob Johnson",
    date: "Il y a 1 semaine",
    rating: 3.5,
    comment:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
];

import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Button from "@/components/Button";
import ProfileInfo from "@/components/ProfilePage/ProfileInfo";
import ProfileTabs from "@/components/ProfilePage/ProfileTabs";

function AccountPage() {
  const { user, accessToken } = useAuthContext();

  // console.log("user =>", user);

  return (
    <div className="container mx-auto pt-7 pb-12 px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
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
