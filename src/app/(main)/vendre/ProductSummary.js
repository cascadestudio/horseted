import Button from "@/components/Button";
import DisplayMedia from "../../../components/DisplayMedia";

export default function ProductSummary({ postResponse }) {
  const { title, brand, size, medias } = postResponse;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center pt-[50px] pb-[70px] bg-light-grey">
        <h1 className="font-mcqueen font-bold text-3xl mb-2 capitalize">
          {title}
        </h1>
        <p className="text-sm font-extrabold text-light-green mb-1">{brand}</p>
        <p className="text-sm font-medium text-grey">{size.value}</p>
        <div className="mt-5">
          <DisplayMedia productSummary medias={medias} />
        </div>
      </div>
      <div className="bg-white w-full">
        <div className="flex flex-col items-center container mx-auto px-5">
          <h2 className="font-mcqueen font-bold text-[24px] mt-14">
            Article en vente
          </h2>
          <p className="font-medium text-sm mb-9">
            Félicitations, votre article est en vente. Vous pouvez le modifier
            depuis votre espace personnel.
          </p>
          <Button className="w-full max-w-[890px]" href="/">
            Terminer
          </Button>
          <Button
            className="mt-5 w-full max-w-[890px] mb-5"
            variant="transparent-green"
            onClick={() => window.location.reload()}
          >
            Ajouter un autre article
          </Button>
        </div>
      </div>
    </div>
  );
}
