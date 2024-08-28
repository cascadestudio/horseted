"use client";

// TODO: Fetch products
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
import { useEffect, useState } from "react";

import CreateBundleModal from "../../product/[id]/CreateBundleModal";
import fetchHorseted from "@/utils/fetchHorseted";
import Spinner from "@/components/Spinner";
import ProfileInfo from "@/components/ProfilePage/ProfileInfo";
import ProfileTabs from "@/components/ProfilePage/ProfileTabs";

function SellerPage({ params }) {
  const { user, accessToken } = useAuthContext();
  const [isCreateBundleModalOpen, setIsCreateBundleModalOpen] = useState(false);
  const [bundle, setBundle] = useState([]);
  const [bundlePrice, setBundlePrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(5.9);
  const [seller, setSeller] = useState(null);

  // console.log("seller =>", seller);

  const handleOpenCreateBundleModal = () => setIsCreateBundleModalOpen(true);
  const handleCloseCreateBundleModal = () => setIsCreateBundleModalOpen(false);

  useEffect(() => {
    getSeller();
  }, []);

  const getSeller = async () => {
    const seller = await fetchHorseted(`/users/${params.id}`, accessToken);
    setSeller(seller);
  };

  if (!seller) return <Spinner />;

  return (
    <div className="container mx-auto pt-7 pb-12 px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <ProfileInfo profile={seller} accessToken={accessToken} />
        <div className="flex gap-3 lg:ml-8">
          <Button variant="transparent-green" href="/messagerie">
            Contacter
          </Button>
          <Button onClick={handleOpenCreateBundleModal}>Acheter un lot</Button>
        </div>
      </div>
      <ProfileTabs profile={seller} accessToken={accessToken} />
      {isCreateBundleModalOpen && (
        <CreateBundleModal
          username={user?.username}
          review={{ rating: 4.5, count: 6 }}
          userProducts={{ items: [] }}
          bundle={bundle}
          setBundle={setBundle}
          bundlePrice={bundlePrice}
          setBundlePrice={setBundlePrice}
          shippingPrice={shippingPrice}
          setShippingPrice={setShippingPrice}
          isCreateBundleModalOpen={isCreateBundleModalOpen}
          onCloseCreateBundleModal={handleCloseCreateBundleModal}
        />
      )}
    </div>
  );
}

export default withAuth(SellerPage);
