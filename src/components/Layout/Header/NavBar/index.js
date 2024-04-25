"use client";

import Link from "next/link";
// import getCategories from "./getCategories";
import SubCategories from "./SubCategories";
import { useEffect, useState } from "react";

export default function NavBar({ className }) {
  const [categories, setCategories] = useState([]);
  const [isSubCategories, setIsSubCategories] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, []);

  return (
    <nav className={className + " py-4 border-t font-raleway font-semibold"}>
      <ul className="flex">
        {categories.map((category) => {
          const { name, id } = category;
          return (
            <li
              key={name}
              className="mr-5"
              onClick={() => setIsSubCategories(true)}
            >
              {name}
              {isSubCategories && <SubCategories parentId={id} />}
            </li>
          );
        })}
      </ul>
      <div className=" border-l border-black [&>*]:ml-5">
        <Link href="/aide">Aide</Link>
        <Link href="/a-propos">À propos</Link>
        <Link href="/articles">Articles</Link>
      </div>
    </nav>
  );
}
