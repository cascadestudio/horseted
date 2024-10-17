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
import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { postMedia } from "@/utils/postMedia";

export default function PostProductForm({
  accessToken,
  setPostResponse,
  setIsLoading,
}) {
  const [formTouched, setFormTouched] = useState(false);
  const [imgfiles, setImgFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
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

  useEffect(() => {
    if (formTouched && !isFormValid) {
      validateForm();
    }
  }, [product, formTouched]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormTouched(true);
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!product.title) formErrors.title = "Veuillez ajouter un titre.";
    if (!product.price || product.price <= 0)
      formErrors.price = "Veuillez ajouter un prix supérieur à 0.";
    if (!product.description)
      formErrors.description = "Veuillez ajouter une description.";
    if (!product.categoryId)
      formErrors.categoryId = "Veuillez sélectionner une catégorie.";
    if (!product.sizeId)
      formErrors.sizeId = "Veuillez sélectionner une taille.";
    if (!product.state)
      formErrors.state = "Veuillez indiquer l'état du produit.";
    if (!product.shipping)
      formErrors.shipping = "Veuillez choisir un mode d'expédition.";
    if (!product.colors || product.colors.length === 0)
      formErrors.colors = "Veuillez ajouter au moins une couleur.";
    if (imgfiles.length === 0)
      formErrors.medias = "Veuillez ajouter au moins une photo.";
    if (!product.brand) formErrors.brand = "Veuillez ajouter une marque.";

    setErrors(formErrors);

    const isFormValid = Object.keys(formErrors).length === 0;
    setIsFormValid(isFormValid);
    return isFormValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    if (!validateForm()) return;

    setIsLoading(true);

    const medias = await PostImgsAndReturnIds();

    const formattedProduct = {
      ...product,
      price: product.price * 100,
      medias: medias,
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

  const PostImgsAndReturnIds = async () => {
    const mediaResponses = await Promise.all(
      imgfiles.map(async (file) => {
        const media = await postMedia(file, accessToken);
        return media.id;
      })
    );
    return mediaResponses;
  };

  return (
    <div className="px-5">
      <form
        onSubmit={handleFormSubmit}
        className="container mx-auto p-5 lg:p-16 bg-white rounded-3xl flex flex-col items-center gap-7 max-w-[1050px]"
      >
        <div className="relative">
          <ProductMedia
            imgFiles={imgfiles}
            setImgFiles={setImgFiles}
            handleFormChange={handleFormChange}
          />
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
            className="mx-0 lg:mx-2 max-w-[700px]"
            hideLabel
            placeholder="Ex : Couverture de poney"
          />
          {errors.title && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.title}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:justify-center relative">
          <h3 className="font-mcqueen font-semibold w-[200px]">
            Description de l'article* :
          </h3>
          <TextInput
            onChange={handleFormChange}
            name="description"
            value={product.description}
            className="mx-0 lg:mx-2 max-w-[700px]"
            hideLabel
            type="textarea"
            placeholder="Ex : Acheté le 10/12/2024, porté quelques fois mais ne me convient pas. Très bon état...poney"
          />
          {errors.description && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.description}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:justify-center">
          <h3 className="font-mcqueen font-semibold w-[200px]">Prix* :</h3>
          <label
            className="font-mcqueen font-semibold w-full max-w-[700px]"
            htmlFor="price"
          >
            <div className="flex items-center border-b border-black relative">
              <input
                onChange={handleFormChange}
                name="price"
                value={product.price}
                type="number"
                step="0.01"
                placeholder="Ex : 20"
                className="focus:outline-none border-none bg-transparent w-full placeholder:text-grey pt-1 pb-2 resize-none overflow-hidden break-words whitespace-pre-wrap text-base"
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
        <div className="relative w-full">
          <Category product={product} setProduct={setProduct} />
          {errors.categoryId && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.categoryId}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <State product={product} setProduct={setProduct} />
          {errors.state && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.state}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <Size product={product} setProduct={setProduct} />
          {errors.size && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.size}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <Colors product={product} setProduct={setProduct} />
          {errors.colors && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.colors}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <Brand product={product} setProduct={setProduct} />
          {errors.brand && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.brand}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <Materials product={product} setProduct={setProduct} />
          {errors.materials && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.materials}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <Shipping product={product} setProduct={setProduct} />
          {errors.shipping && (
            <p className="text-red text-xs absolute right-2 bottom-[-20px]">
              {errors.shipping}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-[900px] mb-5">
          Publier l'article
        </Button>
      </form>
    </div>
  );
}
