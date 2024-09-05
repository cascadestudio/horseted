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
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    let formErrors = {};
    if (!product.title) formErrors.title = "Le titre est obligatoire.";
    if (!product.price || product.price <= 0)
      formErrors.price = "Le prix doit être un nombre positif.";
    if (!product.description)
      formErrors.description = "La description est obligatoire.";
    if (!product.categoryId)
      formErrors.categoryId = "La catégorie est obligatoire.";
    if (!product.sizeId) formErrors.sizeId = "La taille est obligatoire.";
    if (!product.state) formErrors.state = "L'état est obligatoire.";
    if (!product.shipping)
      formErrors.shipping = "Le mode d'expédition est obligatoire.";
    if (!product.materials || product.materials.length === 0)
      formErrors.materials = "Les matériaux sont obligatoires.";
    if (!product.colors || product.colors.length === 0)
      formErrors.colors = "Les couleurs sont obligatoires.";
    if (!product.medias.length)
      formErrors.medias = "Veuillez ajouter au moins 1 photo";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;

    setIsLoading(true);
    const formattedProduct = {
      ...product,
      price: product.price * 100, // Convert price to cents
    };
    const response = await fetchHorseted(
      "/products",
      accessToken,
      "POST",
      formattedProduct,
      true
    );
    console.log("response =>", response);
    setIsLoading(false);
    setPostResponse(response);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="container mx-auto p-16 bg-white rounded-3xl flex flex-col items-center gap-7"
    >
      <div className="relative">
        <ProductMedia accessToken={accessToken} setProduct={setProduct} />
        {errors.medias && (
          <p className="text-red text-xs absolute right-0 bottom-[-20px]">
            {errors.medias}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:justify-center relative">
        <h3 className="font-mcqueen font-semibold w-[200px]">
          Titre de l'article* :
        </h3>
        <TextInput
          onChange={handleFormChange}
          name="title"
          value={product.title}
          className="mx-0 lg:mx-2"
          hideLabel
          placeholder="Ex : Couverture de poney"
        />
        {errors.title && (
          <p className="text-red text-xs absolute right-0 bottom-[-20px]">
            {errors.title}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:justify-center">
        <h3 className="font-mcqueen font-semibold w-[200px]">
          Description de l'article :
        </h3>
        <TextInput
          onChange={handleFormChange}
          name="description"
          value={product.description}
          className="mx-0 lg:mx-2"
          hideLabel
          type="textarea"
          placeholder="Ex : Acheté le 10/12/2024, porté quelques fois mais ne me convient pas. Très bon état...poney"
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:justify-center">
        <h3 className="font-mcqueen font-semibold w-[200px]">Prix* :</h3>
        <label className="font-mcqueen font-semibold w-full" htmlFor="price">
          <div className="flex items-center border-b border-black relative">
            <input
              onChange={handleFormChange}
              name="price"
              value={product.price}
              type="number"
              step="0.01"
              placeholder="Ex : 20"
              className="focus:outline-none border-none bg-transparent w-full placeholder:text-grey pt-1 pb-2 resize-none overflow-hidden break-words whitespace-pre-wrap"
            />
            <span className="text-xl font-mcqueen font-semibold mr-2">€</span>
            {errors.price && (
              <p className="text-red text-xs font-sans font-normal absolute right-0 bottom-[-20px]">
                {errors.price}
              </p>
            )}
          </div>
        </label>
      </div>
      <div className="relative">
        <Category product={product} setProduct={setProduct} />
        {errors.categoryId && (
          <p className="text-red text-xs absolute right-0 bottom-[-20px]">
            {errors.categoryId}
          </p>
        )}
      </div>
      <div className="relative">
        <State product={product} setProduct={setProduct} />
        {errors.state && (
          <p className="text-red text-xs absolute right-0 bottom-[-20px]">
            {errors.state}
          </p>
        )}
      </div>
      <Size product={product} setProduct={setProduct} />
      <Colors product={product} setProduct={setProduct} />
      <Brand product={product} setProduct={setProduct} />
      <Materials product={product} setProduct={setProduct} />
      <div className="relative">
        <Shipping product={product} setProduct={setProduct} />
        {errors.shipping && (
          <p className="text-red text-xs absolute right-0 bottom-[-20px]">
            {errors.shipping}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full max-w-[900px] mb-5">
        Publier l'article
      </Button>
    </form>
  );
}
