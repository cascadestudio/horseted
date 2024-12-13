import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold mb-4">Mentions légales</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Site et Application</h2>
      <ul className="list-disc list-inside">
        <li>
          <span className="font-bold">Site internet</span> (ci-après « le Site
          ») : désigne le site{" "}
          <a
            href="https://horseted.com"
            className="text-blue-600 hover:underline"
          >
            https://horseted.com
          </a>
        </li>
        <li>
          <span className="font-bold">Application mobile</span> (ci-après l’«
          Application ») : désigne l’application mobile Horseted disponible pour
          les smartphones sous iOS (Apple Store) et Android (Play Store).
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Éditeur</h2>
      <p>
        <span className="font-bold">Horseted</span> SAS au capital de 10000€
        dont le siège social est situé 6 IMPASSE VAUBAN 66440 TORREILLES -
        France représentée par Lea Escande en sa qualité de Président,
        immatriculée au RCS de Perpignan 980 946 693, TVA intracommunautaire :
        FR62980946693.
      </p>
      <p>Directeur de Publication : Lea Escande</p>
      <p>
        Courriel de contact :{" "}
        <a
          href="mailto:info@horseted.com"
          className="text-blue-600 hover:underline"
        >
          info@horseted.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Hébergeur</h2>
      <p>
        Le Site est hébergé par la société Vercel Inc. située 340 S Lemon Ave
        #4133 Walnut CA 91789 et joignable au (559) 288-7060.
      </p>
      <p>
        Les données de l’Application sont hébergées par{" "}
        <span className="font-bold">Google</span> (1600 Amphitheatre Parkway
        Mountain View Californie 94043 United States) et{" "}
        <span className="font-bold">Infomaniak</span> (Rue Eugène-Marziano 25
        1227 Genève Suisse).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Délégué à la protection des données
      </h2>
      <p>
        Un délégué à la protection des données : Lea Escande est à votre
        disposition pour toute question relative à la protection de vos données
        personnelles.
      </p>
      <p>
        Les informations concernant la collecte et le traitement des données
        personnelles sont fournies dans la{" "}
        <Link
          href="/politique-de-confidentialite"
          className="text-blue-600 hover:underline"
        >
          Politique de confidentialité
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Conditions Générales</h2>
      <ul className="list-disc list-inside">
        <li>
          Les Conditions Générales d’utilisation sont accessibles{" "}
          <Link href="/cgu" className="text-blue-600 hover:underline">
            ici
          </Link>
          .
        </li>
        <li>
          Les Conditions Générales des ventes sont accessibles{" "}
          <Link href="/cgv" className="text-blue-600 hover:underline">
            ici
          </Link>
          .
        </li>
      </ul>
    </div>
  );
}
