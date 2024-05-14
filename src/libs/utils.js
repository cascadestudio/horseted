import localFont from "next/font/local";
import { Raleway } from "next/font/google";

export const mcqueen = localFont({
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

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const baseMetadata = {
  title: "Horseted",
  description: "Horseted",
};
