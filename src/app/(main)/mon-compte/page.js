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
import AvatarDisplay from "@/components/AvatarDisplay";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import fetchHorseted from "@/utils/fetchHorseted";

function AccountPage() {
  const { user, accessToken } = useAuthContext();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState({
    city: "",
    code: "",
  });

  // console.log("user =>", user);

  useEffect(() => {
    getProducts();
    getCity();
  }, []);

  const getProducts = async () => {
    const products = await fetchHorseted(
      `/products?userId=${user.id}`,
      accessToken
    );
    setProducts(products.items);
  };

  const getCity = async () => {
    const addresses = await fetchHorseted(`/users/me/addresses`, accessToken);
    const shippingAddresses = addresses.find(
      (address) => address.type === "shipping"
    );

    let defaultAddress = {};
    let city = "";
    let code = "";
    if (Array.isArray(shippingAddresses)) {
      defaultAddress = shippingAddresses.find(
        (address) => address.isDefault === true
      );
      if (defaultAddress) {
        city = defaultAddress.city;
        code = defaultAddress.postalCode;
      } else {
        city = shippingAddresses[0].city;
        code = shippingAddresses[0].postalCode;
      }
    } else {
      city = shippingAddresses.city;
      code = shippingAddresses.postalCode;
    }
    setLocation({
      city,
      code: code.slice(0, 2),
    });
  };

  return (
    <div className="container mx-auto pt-7 pb-12 px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <AvatarDisplay avatar={user.avatar} size={130} />
        <div className="flex flex-col items-center lg:items-start lg:pt-12">
          <StarRating rating="4.5" count="6" />
          <p className="text-[22px] font-mcqueen font-semibold">
            {user.username}
          </p>
          {location.city && location.code && (
            <div className="flex gap-2 items-center font-medium text-sm mb-4">
              <CityIcon className="w-3 stroke-current fill-none" />
              <p>
                {location.city} ({location.code})
              </p>
            </div>
          )}
          <p className="text-sm leading-6">{user.description}</p>
        </div>
        <Button href="/parametres" className="lg:ml-36">
          Modifier mon profil
        </Button>
      </div>
      <div className="mt-8">
        <div className="flex border-b border-lighter-grey">
          {products.length > 0 && (
            <button
              className={`px-4 py-2 text-lg font-medium font-mcqueen ${
                activeTab === "products"
                  ? "text-light-green border-b-[3px] border-light-green"
                  : "text-grey"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Produits
            </button>
          )}
          <button
            className={`px-4 py-2 text-lg font-medium font-mcqueen ${
              activeTab === "reviews"
                ? "text-light-green border-b-[3px] border-light-green"
                : "text-grey"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Évaluations
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "products" && products.length > 0 && (
            <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 py-12">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </section>
          )}
          {activeTab === "reviews" && (
            <div>
              <div className="flex flex-col items-center justify-center border-b border-lighter-grey mb-8 pb-5">
                <p className="font-mcqueen font-semibold text-[40px] leading-[48px]">
                  4.5
                </p>
                <p className="font-mcqueen">{reviews.length} évaluations</p>
                <StarRating rating="4.5" count="6" />
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center break-inside-avoid mb-3"
                  >
                    <ReviewCard
                      avatarSrc={review.avatarSrc}
                      author={review.author}
                      date={review.date}
                      rating={review.rating}
                      comment={review.comment}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AccountPage);
