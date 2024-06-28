"use client";
import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const pages = [
  { title: "Paramètres du profil", path: "" },
  { title: "Personnalisation", path: "personalisation" },
  {
    title: "Paiements & encaissements",
    path: "paiements-encaissements",
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
    <div className="grid grid-cols-2">
      <div>
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
      <div>{children}</div>
    </div>
  );
}

export default withAuth(SettingsLayout);
