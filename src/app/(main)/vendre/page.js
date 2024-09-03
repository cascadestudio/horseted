"use client";

import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import CloseButton from "@/assets/icons/CloseButton";
import { TextInput } from "@/components/input";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

import ProductMedia from "./selects/ProductMedia";
import Category from "./selects/Category";
import State from "./selects/State";
import Size from "./selects/Size";
import Colors from "./selects/Colors";
import Brand from "./selects/Brand";
import Materials from "./selects/Materials";
import Shipping from "./selects/Shipping";
import ProductSummary from "./ProductSummary";

export default function SellPage() {
  const { accessToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [postResponse, setPostResponse] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    sizeId: "",
    categoryId: "",
    brand: "",
    materials: [],
    state: "",
    shipping: "",
    colors: [],
    medias: [],
  });

  // console.log("product =>", product);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    const response = await fetchHorseted(
      "/products",
      accessToken,
      "POST",
      product,
      true,
      true
    );
    console.log("response =>", response);
    setIsLoading(false);
    setPostResponse(response);
  };

  if (isLoading) return <Spinner />;

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
      {postResponse ? (
        <ProductSummary postResponse={postResponse} />
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="container mx-auto px-5 pt-5 flex flex-col items-center gap-7"
        >
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
                <span className="text-xl font-mcqueen font-semibold mr-2">
                  €
                </span>
              </div>
            </label>
          </div>
          <Category product={product} setProduct={setProduct} />
          <State product={product} setProduct={setProduct} />
          <Size product={product} setProduct={setProduct} />
          <Colors product={product} setProduct={setProduct} />
          <Brand product={product} setProduct={setProduct} />
          <Materials product={product} setProduct={setProduct} />
          <Shipping product={product} setProduct={setProduct} />
          <Button
            onClick={handleFormSubmit}
            className="w-full max-w-[900px] mb-5"
          >
            Publier l'article
          </Button>
        </form>
      )}
    </div>
  );
}
