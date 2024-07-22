"use client";
import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SettingsProfileIcon from "@/assets/icons/SettingsProfileIcon";
import PersonalisationIcon from "@/assets/icons/PersonalisationIcon";
import PaymentsIcon from "@/assets/icons/PaymentsIcon";
import CashIcon from "@/assets/icons/CashIcon";
import AddressesIcon from "@/assets/icons/AddressesIcon";
import NotificationsIcon from "@/assets/icons/NotificationsIcon";
import VacationModeIcon from "@/assets/icons/VacationModeIcon";

const pages = [
  { title: "Paramètres du profil", path: "", icon: SettingsProfileIcon },
  {
    title: "Personnalisation",
    path: "personalisation",
    icon: PersonalisationIcon,
  },
  { title: "Paiements", path: "paiements", icon: PaymentsIcon },
  { title: "Encaissements", path: "encaissements", icon: CashIcon },
  { title: "Adresses", path: "adresses", icon: AddressesIcon },
  { title: "Notifications", path: "notifications", icon: NotificationsIcon },
  { title: "Mode vacances", path: "mode-vacances", icon: VacationModeIcon },
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
    <div className="container mx-auto px-5 grid grid-cols-3 gap-14 pt-11 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Paramètres</h1>
        <aside className="bg-light-grey flex flex-col border border-lighter-grey">
          {pages.map((page, index) => {
            const Icon = page.icon;
            const isActive = activePath === page.path;
            return (
              <a
                className={`p-4 flex items-center ${
                  isActive ? "bg-pale-grey" : ""
                }`}
                key={index}
                href={`/parametres/${page.path}`}
              >
                <Icon className="w-4 h-4 text-light-green mr-4" />
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

export default withAuth(SettingsLayout);
