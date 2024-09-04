import ProductMedia from "./selects/ProductMedia";
import Category from "./selects/Category";
import State from "./selects/State";
import Size from "./selects/Size";
import Colors from "./selects/Colors";
import Brand from "./selects/Brand";
import Materials from "./selects/Materials";
import Shipping from "./selects/Shipping";
import { TextInput } from "@/components/input";
import Button from "@/components/Button";
import { useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";

export default function PostProductForm({
  accessToken,
  setPostResponse,
  setIsLoading,
}) {
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

  return (
    <form
      onSubmit={handleFormSubmit}
      className="container mx-auto px-5 pt-5 bg-white rounded-3xl flex flex-col items-center gap-7"
    >
      <ProductMedia accessToken={accessToken} setProduct={setProduct} />
      <div className="w-full flex flex-col lg:flex-row lg:justify-center">
        <h3 className="font-mcqueen font-semibold w-[200px]">
          Titre de l'article* :
        </h3>
        <TextInput
          onChange={handleFormChange}
          name="title"
          value={product.title}
          required
          className="max-w-[700px] mx-0 lg:mx-2"
          hideLabel
          placeholder="Ex : Couverture de poney"
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:justify-center">
        <h3 className="font-mcqueen font-semibold w-[200px]">
          Description de l'article :
        </h3>
        <TextInput
          onChange={handleFormChange}
          name="description"
          value={product.description}
          required
          className="max-w-[700px] mx-0 lg:mx-2"
          hideLabel
          type="textarea"
          placeholder="Ex : Acheté le 10/12/2024, porté quelques fois mais ne me convient pas. Très bon état...poney"
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:justify-center">
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
      <State product={product} setProduct={setProduct} />
      <Size product={product} setProduct={setProduct} />
      <Colors product={product} setProduct={setProduct} />
      <Brand product={product} setProduct={setProduct} />
      <Materials product={product} setProduct={setProduct} />
      <Shipping product={product} setProduct={setProduct} />
      <Button onClick={handleFormSubmit} className="w-full max-w-[900px] mb-5">
        Publier l'article
      </Button>
    </form>
  );
}
