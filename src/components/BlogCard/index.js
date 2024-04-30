import Link from "next/link";
import Image from "next/image";
import RightArrow from "@/assets/icons/RightArrow.js";
export default function BlogCard({ title, text, image, link }) {
  return (
    <div className="border border-light-green rounded-md max-w-[350px]">
      <div className="flex items-center justify-center w-full p-1">
        <img
          className="w-full h-52 object-cover rounded-md"
          src={image}
          alt={title}
        />
      </div>
      <div className="p-6">
        <h3 className="font-mcqueen font-semibold text-xl mb-3">{title}</h3>
        <p className="mb-5">{text}</p>
        <Link className="flex items-center text-light-green" href={link}>
          Lire l'article
          <RightArrow stroke="#4D7A4C" className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
