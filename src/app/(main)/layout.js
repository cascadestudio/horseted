import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { AuthContextProvider } from "@/context/AuthContext";

export default function HomeLayout({ children }) {
  return (
    <AuthContextProvider>
      <Header />
      <main className="bg-light-grey">{children}</main>
      <Footer />
      <CookieConsent />
    </AuthContextProvider>
  );
}
