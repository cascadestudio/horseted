"use client";

import Image from "next/image";

export default function RenderBlob({ image }) {
  return (
    <>
      <img src={image} alt="" />
      <Image src={image} width={100} height={100} />
    </>
  );
}
