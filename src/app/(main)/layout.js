import ClientStripeProvider from "@/components/ClientStripeProvider";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export default function HomeLayout({ children }) {
  return (
    <ClientStripeProvider>
      <Header />
      {children}
      <Footer />
    </ClientStripeProvider>
  );
}
