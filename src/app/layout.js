import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { mcqueen, raleway, poppins } from "@/utils/fonts";

export const metadata = {
  title: "Horseted",
  description: "Horseted",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${mcqueen.variable} ${raleway.variable} ${poppins.variable} font-sans`}
      >
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
