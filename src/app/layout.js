import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { mcqueen, raleway, baseMetadata } from "@/libs/utils";

export const metadata = baseMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${mcqueen.variable} ${raleway.variable} font-sans`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
