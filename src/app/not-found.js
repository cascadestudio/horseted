import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-mcqueen font-bold">
          La page n'existe pas
        </h1>
        <p className="text-lg leading-[48px] m-8">
          Désolé, mais on dirait que cette page n'existe plus. Revenir à la page
          d’accueil
        </p>
        <Button href="/">Retour accueil</Button>
      </div>
      <Footer />
    </>
  );
}
