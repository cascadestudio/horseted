"use client";

import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const pages = [
  {
    title: "Historique des achats",
    path: "achats" /* icon: SettingsProfileIcon */,
  },
  {
    title: "Historique des ventes",
    path: "ventes" /* icon: SettingsProfileIcon */,
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
                {/* <Icon className="w-4 h-4 text-light-green mr-4" /> */}
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
