"use client";

import Link from "next/link";
// import getCategories from "./getCategories";
import SubCategories from "./SubCategories";
import { useEffect } from "react";

export default function NavBar({ className }) {
  // useEffect(() => {

  // },[])

  // const categories = await getCategories();
  return (
    <nav className={className + " py-4 border-t font-raleway font-semibold"}>
      <ul className="flex">
        {/* {categories.map((category) => {
          const { name, id } = category;
          return (
            <li key={name} className="mr-5">
              {name}
              <SubCategories parentId={id} />
            </li>
          );
        })} */}
      </ul>
      <div className=" border-l border-black [&>*]:ml-5">
        <Link href="/aide">Aide</Link>
        <Link href="/a-propos">À propos</Link>
        <Link href="/articles">Articles</Link>
      </div>
    </nav>
  );
}
