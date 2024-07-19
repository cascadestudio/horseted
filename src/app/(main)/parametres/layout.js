"use client";
import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const pages = [
  { title: "Paramètres du profil", path: "" },
  { title: "Personnalisation", path: "personalisation" },
  {
    title: "Paiements & encaissements",
    path: "paiements",
  },
  { title: "Adresses", path: "adresses" },
  { title: "Notifications", path: "notifications" },
  { title: "Mode vacances", path: "mode-vacances" },
];

function SettingsLayout({ children }) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    const path = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (path === "parametres") {
      setActivePath("");
    } else {
      setActivePath(path || "");
    }
  }, [pathname]);

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 pt-11 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <h1 className="font-mcqueen font-bold text-2xl mb-5">
          {pages.find((page) => page.path === activePath)?.title}
        </h1>
        <aside className="bg-light-grey flex flex-col">
          {pages.map((page, index) => (
            <a className="p-4" key={index} href={`/parametres/${page.path}`}>
              {page.title}
            </a>
          ))}
        </aside>
      </div>
      <div className="col-span-3 lg:col-span-2">{children}</div>
    </div>
  );
}

export default withAuth(SettingsLayout);
