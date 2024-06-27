"use client";
import withAuth from "@/hoc/withAuth";

function SettingsLayout({ children }) {
  return (
    <div>
      <aside>
        <h1>Paramètres</h1>
        <div>
          <a href="/parametres">Paramètres du profil</a>
          <a href="/parametres/personalisation">Personnalisation</a>
          <a>Paiements & encaissements</a>
          <a>Adresses</a>
          <a>Notifications</a>
          <a>Mode vacances</a>
        </div>
      </aside>
      {children}
    </div>
  );
}

export default withAuth(SettingsLayout);
