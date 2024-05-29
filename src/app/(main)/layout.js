import "../globals.css";
import Layout from "@/components/Layout";
import { AuthContextProvider } from "@/context/AuthContext";
import { mcqueen, raleway, baseMetadata } from "@/libs/utils";

export const metadata = baseMetadata;

export default function HomeLayout({ children }) {
  return (
    // <html lang="fr">
    //   <body className={`${mcqueen.variable} ${raleway.variable} font-sans`}>
    <AuthContextProvider>
      <Layout>{children}</Layout>
    </AuthContextProvider>
    //   </body>
    // </html>
  );
}
