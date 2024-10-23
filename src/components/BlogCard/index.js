import Link from "next/link";
import Image from "next/image";
import RightArrow from "@/assets/icons/RightArrow.js";
import { urlForImage } from "../../../sanity/lib/image";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

export default function BlogCard({
  title,
  image,
  description,
  link,
  className,
}) {
  const fullConfig = resolveConfig(tailwindConfig);
  return (
    <div
      className={`relative border border-light-green rounded-md h-[450px] max-w-[350px] lg:w-[350px] ${className}`}
    >
      <Link
        href={`/actualites/articles/${link}`}
        className="absolute inset-0 z-10"
        title={title}
      />

      <div className="flex items-center justify-center w-full p-1 z-0">
        <Image
          className="w-full h-auto max-h-[210px] object-cover rounded-md"
          src={urlForImage(image)}
          alt={title}
          height={210}
          width={350}
        />
      </div>
      <div className="p-6 flex flex-col gap-3 justify-between z-0">
        <p className="font-mcqueen font-semibold text-xl line-clamp-2 overflow-hidden text-ellipsis">
          {title}
        </p>
        <div className="prose line-clamp-3 lg:prose-lg">{description}</div>
        <p className="flex items-center text-light-green justify-self-end">
          Lire l'article
          <RightArrow
            color={fullConfig.theme.colors["light-green"]}
            className="ml-2"
          />
        </p>
      </div>
    </div>
  );
}
