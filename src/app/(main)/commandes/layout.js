"use client";

import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

const pages = [
  {
    title: "Historique des achats",
    path: "achats",
    icon: "/icons/purchases.svg",
  },
  {
    title: "Historique des ventes",
    path: "ventes",
    icon: "/icons/sales.svg",
  },
];

const breadcrumbs = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Commandes",
  },
];

function CommandesLayout({ children }) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("achats");

  useEffect(() => {
    const path = pathname.substring(pathname.lastIndexOf("/") + 1);
    setActivePath(path || "achats");
  }, [pathname]);

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pt-11 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Commandes</h1>
        <aside className="bg-light-grey flex flex-col border border-lighter-grey">
          {pages.map((page, index) => {
            // const Icon = page.icon;
            const isActive = activePath === page.path;
            return (
              <a
                className={`p-4 flex items-center ${
                  isActive ? "bg-pale-grey" : ""
                }`}
                key={index}
                href={`/commandes/${page.path}`}
              >
                <img src={page.icon} alt="" className="w-6 h-6 mr-4" />
                <span className="font-semibold">{page.title}</span>
              </a>
            );
          })}
        </aside>
      </div>
      <div className="col-span-3 lg:col-span-2">{children}</div>
    </div>
  );
}

export default withAuth(CommandesLayout);
