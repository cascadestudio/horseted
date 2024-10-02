import "./styles/globals.css";
import { mcqueen, raleway, poppins } from "@/utils/fonts";

export const metadata = {
  title: "Horseted",
  description: "Horseted",
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
        {children}
      </body>
    </html>
  );
}
