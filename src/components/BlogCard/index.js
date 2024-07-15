import Link from "next/link";
import Image from "next/image";
import RightArrow from "@/assets/icons/RightArrow.js";
import { urlForImage } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

export default function BlogCard({ title, image, body, link, className }) {
  const fullConfig = resolveConfig(tailwindConfig);
  return (
    <div
      className={`border border-light-green rounded-md h-[450px] max-w-[350px] ${className}`}
    >
      <div className="flex items-center justify-center w-full p-1">
        <Image
          className="w-full h-auto object-cover rounded-md"
          src={urlForImage(image)}
          alt={title}
          height={210}
          width={350}
        />
      </div>
      <div className="p-6">
        <h3 className="font-mcqueen font-semibold text-xl mb-3">{title}</h3>
        <div className="mb-5 prose line-clamp-3 lg:prose-lg">
          <PortableText value={body} />
        </div>
        <Link className="flex items-center text-light-green" href={link}>
          Lire l'article
          <RightArrow
            color={fullConfig.theme.colors["light-green"]}
            className="ml-2"
          />
        </Link>
      </div>
    </div>
  );
}
