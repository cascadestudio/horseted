import GoogleTagManager from "@/libs/GoogleTagManager";
import "./styles/globals.css";
import { mcqueen, raleway, poppins } from "@/utils/fonts";

const baseMetadata = {
  title:
    "Achetez et vendez votre matériel d'équitation Neuf ou d'occastion avec Horseted",
  description:
    "Téléchargez l’application Horseted et donnez une seconde vie à vos articles d’équitation en vendant votre matériel dès maintenant !",
  imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/images/og-image.jpg`,
};

export const metadata = {
  title: baseMetadata.title,
  description: baseMetadata.description,
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,

    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: baseMetadata.title,
    images: [
      {
        url: baseMetadata.imageUrl,
        width: 1440,
        height: 873,
        alt: baseMetadata.title,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [baseMetadata.imageUrl],
  },

  // Remove in production
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${mcqueen.variable} ${raleway.variable} ${poppins.variable} font-sans`}
      >
        <GoogleTagManager gtmId="GTM-MX76WLD9" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MX76WLD9"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
