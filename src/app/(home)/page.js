// "use client";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/context/AuthContext";
// import { useEffect } from "react";
import ProductsSection from "./ProductsSection";

export default function Home() {
  // const router = useRouter();
  // const { user } = useAuthContext();
  // const idToken = user.accessToken;
  // console.log(idToken);

  // useEffect(() => {
  //   if (user == null) router.push("/signin");
  // }, [user]);

  return (
    <main>
      <RecentProductsSection />
      <div className="bg-dark-green">
        <div className="container mx-auto px-5 py-14 flex flex-col gap-14 lg:flex-row lg:gap-44 lg:py-36">
          <div>
            <h4 className="font-mcqueen font-bold text-2xl text-white mb-1">
              Pourquoi choisir des produits d'équitation de seconde main ?
            </h4>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur
            </p>
          </div>
          <div>
            <h4 className="font-mcqueen font-bold text-2xl text-white mb-1">
              Pourquoi choisir des produits d'équitation de seconde main ?
            </h4>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
