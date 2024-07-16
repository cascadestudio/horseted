import StripeProvider from "@/components/StripeProvider";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export default function HomeLayout({ children }) {
  return (
    <StripeProvider>
      <Header />
      <main className="bg-light-grey">{children}</main>
      <Footer />
    </StripeProvider>
  );
}
