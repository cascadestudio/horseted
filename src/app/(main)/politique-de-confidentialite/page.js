export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-5 lg:px-0">
      <h1 className="text-3xl font-bold mb-5">Politique de confidentialité</h1>
      <h2 className="text-2xl font-bold mb-2">Informations collectées</h2>
      <p className="mb-5">
        Nous collectons des informations sur vous lorsque vous utilisez notre
        site web, notamment votre adresse IP, le type de navigateur que vous
        utilisez, les pages que vous visitez et les liens que vous cliquez.
      </p>
      <p className="mb-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Type d'information</th>
              <th className="text-left">But</th>
              <th className="text-left">Durée de conservation</th>
              <th className="text-left">Partage</th>
              <th className="text-left">Droits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Adresse IP</td>
              <td>Amélioration de l'expérience utilisateur</td>
              <td>1 an</td>
              <td>Oui, avec nos partenaires</td>
              <td>
                Accès, rectification, opposition, portabilité et suppression
              </td>
            </tr>
          </tbody>
        </table>
      </p>
    </div>
  );
}
