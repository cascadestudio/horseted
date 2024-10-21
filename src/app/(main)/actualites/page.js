import CategoryBlogSection from "./CategoryBlogSection";
import { client } from "../../../../sanity/lib/client";
import Button from "@/components/Button";
import Link from "next/link";

export default async function BlogPage() {
  const articles = await client.fetch(
    `*[_type == "article"] | order(orderRank asc) { 
      ..., 
      category->{_id, title, slug},
      _createdAt
    }`,
    { cache: "no-store" }
  );
  const categories = await client.fetch(
    `*[_type == "category"] | order(orderRank asc)`,
    { cache: "no-store" }
  );

  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 py-12">
        <h2 className="font-mcqueen font-bold text-2xl mb-5 lg:text-4xl">
          Tout ce qu’il faut savoir sur le matériel d’équitation de seconde main
        </h2>
        <p>
          L’achat de matériel d’équitation de seconde main est un excellent
          moyen de faire des économies tout en contribuant à une démarche plus
          durable et respectueuse de l’environnement. Que vous soyez cavalier
          débutant ou confirmé, trouver des équipements de qualité à un prix
          réduit est essentiel pour pratiquer l’équitation dans de bonnes
          conditions. Sur cette page, nous allons vous guider à travers toutes
          les étapes nécessaires pour réussir vos achats.
        </p>
        <p>
          Selles, filets, bottes, gilets de protection, mors… Chaque article a
          ses spécificités, et bien comprendre les critères de choix peut faire
          la différence entre un achat durable et un équipement inadapté.
        </p>
        <p>
          Enfin, acheter d’occasion avec{" "}
          <Link title="Horseted" href="/a-propos">
            Horseted
          </Link>{" "}
          ne signifie pas sacrifier la qualité. Avec les bons conseils, vous
          apprendrez à identifier les opportunités, à vérifier la provenance des
          articles, et à faire des affaires tout en restant confiant dans la
          fiabilité des équipements. Nous aborderons également des astuces pour
          bien entretenir votre matériel, afin de prolonger sa durée de vie et
          d’autres sujets sur <strong>l’équitation, notre passion !</strong>
        </p>
        <span className="font-semibold text-sm leading-[48px] uppercase tracking-[0.2em]">
          Sujets :
        </span>
        <div className="flex flex-wrap gap-3 g mb-8">
          {categories.length > 0 &&
            categories.map((category) => {
              const categoryArticles = articles.filter(
                (article) =>
                  article.category && article.category._id === category._id
              );
              if (categoryArticles.length > 0) {
                return (
                  <Link
                    key={category._id}
                    href={`/actualites/${category.slug.current}`}
                    passHref
                  >
                    <Button key={category._id} variant="transparent-grey">
                      {category.title}
                    </Button>
                  </Link>
                );
              }
              return null;
            })}
        </div>
        {categories.length > 0 ? (
          categories.map((category) => {
            const categoryArticles = articles.filter(
              (article) =>
                article.category && article.category._id === category._id
            );
            if (categoryArticles.length > 0) {
              return (
                <CategoryBlogSection
                  key={category._id}
                  category={category}
                  articles={articles}
                />
              );
            }
            return null;
          })
        ) : (
          <div className="p-4 text-red-500">Pas d'article trouvé</div>
        )}
      </div>
    </div>
  );
}
