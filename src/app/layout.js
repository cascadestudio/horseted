import "./globals.css";
import Layout from "@/components/Layout";
import localFont from "next/font/local";

const mcqueen = localFont({
  src: [
    {
      path: "../assets/fonts/McQueen-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Horseted",
  description: "Horseted",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={mcqueen.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
