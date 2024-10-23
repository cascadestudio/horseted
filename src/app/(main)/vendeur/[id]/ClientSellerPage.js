"use client";

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
    console.log("seller =>", seller);
    setSeller(seller);
  };

  if (!seller) return <Spinner isFullScreen />;

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
      <ProfileTabs profile={seller} />
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
