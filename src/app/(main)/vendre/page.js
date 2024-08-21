"use client";

import CloseButton from "@/assets/icons/CloseButton";
import Dropdown from "@/components/Dropdown";
import { TextInput } from "@/components/input";
import StateSelect from "../articles/ProductFilters/StateSelect";
import SizesSelect from "../articles/ProductFilters/SizesSelect";
import BrandSelect from "../articles/ProductFilters/BrandsSelect";
import MaterialSelect from "../articles/ProductFilters/MaterialsSelect";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import getImage from "@/utils/getImage";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import ProductMedia from "./ProductMedia";
import Category from "./Category";

export default function SellPage() {
  const { accessToken } = useAuthContext();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    sizeId: 0,
    categoryId: null,
    brand: "",
    materials: [],
    state: "",
    shipping: "",
    colors: [],
    medias: [],
  });

  console.log("product =>", product);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-grey">
      <div className="bg-white">
        <div className="flex justify-between container mx-auto px-5 py-2">
          <div className="flex items-center">
            <CloseButton className="cursor-pointer h-7 w-7 lg:h-10 lg:w-10" />
            <span className="font-mcqueen font-bold lg:text-[24px] lg:leading-[48px] ml-4 lg:ml-10">
              Vendre un article
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 pt-5 flex flex-col items-center gap-7">
        <ProductMedia accessToken={accessToken} setProduct={setProduct} />
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px]">
            Titre de l'article* :
          </h3>
          <TextInput
            onChange={handleFormChange}
            name="title"
            value={product.title}
            required
            className="max-w-[700px]"
            hideLabel
            placeholder="Ex : Couverture de poney"
          />
        </div>
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px]">
            Description de l'article :
          </h3>
          <TextInput
            onChange={handleFormChange}
            name="description"
            value={product.description}
            required
            className="max-w-[700px]"
            hideLabel
            type="textarea"
            placeholder="Ex : Acheté le 10/12/2024, porté quelques fois mais ne me convient pas. Très bon état...poney"
          />
        </div>
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px]">Prix* :</h3>
          <label
            className="font-mcqueen font-semibold w-full max-w-[700px] "
            htmlFor="price"
          >
            <div className="flex items-center border-b border-black">
              <input
                onChange={handleFormChange}
                name="price"
                value={product.price}
                required
                type="number"
                step="0.01"
                placeholder="Ex : 20"
                className="focus:outline-none border-none bg-transparent w-full placeholder:text-grey pt-1 pb-2 resize-none overflow-hidden break-words whitespace-pre-wrap"
              />
              <span className="text-xl font-mcqueen font-semibold mr-2">€</span>
            </div>
          </label>
        </div>
        <Category product={product} setProduct={setProduct} />
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
            État* :
          </h3>
          <StateSelect
            title="État de l’article"
            className="w-full max-w-[700px]"
            isBlack
          />
        </div>
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
            Taille :
          </h3>
          {/* // TODO : add activesSizes in SizesSelect */}
          <SizesSelect
            title="Sélectionner une taille"
            className="w-full max-w-[700px]"
            isBlack
          />
        </div>
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
            Couleurs :
          </h3>
          {/* // TODO : add colors to select */}
          <Dropdown
            title="Sélectionner une couleur"
            className="w-full max-w-[700px]"
            isBlack
          />
        </div>
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
            Marques :
          </h3>
          <BrandSelect
            title="Sélectionner une marque"
            className="w-full max-w-[700px]"
            isBlack
          />
        </div>
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
            Matières :
          </h3>
          <MaterialSelect
            title="Sélectionner une matière"
            className="w-full max-w-[700px]"
            isBlack
          />
        </div>
        <div className="w-full flex justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px] my-auto">
            Livraison* :
          </h3>
          {/* // TODO : add shipping sizes */}
          <Dropdown
            title="Sélectionner une taille de colis"
            className="w-full max-w-[700px]"
            isBlack
          />
        </div>
        <Button className="w-full max-w-[900px] mb-5">Publier l'article</Button>
      </div>
    </div>
  );
}
