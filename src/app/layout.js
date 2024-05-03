import "./globals.css";
import Layout from "@/components/Layout";
import localFont from "next/font/local";
import { Raleway, Poppins } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";

const mcqueen = localFont({
  src: [
    {
      path: "../assets/fonts/McQueen-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/McQueen-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/McQueen-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mcqueen",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "700"],
});

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
        <AuthContextProvider>
          <Layout>{children}</Layout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
