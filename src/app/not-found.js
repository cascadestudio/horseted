import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="bg-light-grey">
        <div className="container mx-auto px-5 py-24 flex flex-col lg:py-44 items-center justify-center">
          <h1 className="font-mcqueen font-bold text-xl leading-[48px] lg:mb-3 lg:text-5xl ">
            La page n'existe pas
          </h1>
          <p className="text-center lg:text-lg mb-8">
            Désolé, mais on dirait que cette page n'existe plus. Revenir à la
            page d’accueil.
          </p>
          <Button href="/">Retour accueil</Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
