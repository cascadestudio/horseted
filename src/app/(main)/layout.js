import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { AuthContextProvider } from "@/context/AuthContext";
import { NotificationsContextProvider } from "@/context/NotificationsContext";

export default function HomeLayout({ children }) {
  return (
    <AuthContextProvider>
      <NotificationsContextProvider>
        <Header />
        <main className="bg-light-grey">{children}</main>
        <Footer />
        <CookieConsent />
      </NotificationsContextProvider>
    </AuthContextProvider>
  );
}
