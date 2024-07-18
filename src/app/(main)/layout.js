import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      <main className="bg-light-grey">{children}</main>
      <Footer />
    </>
  );
}
