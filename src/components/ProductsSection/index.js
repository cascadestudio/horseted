"use client";

import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import ProductCard from "@/components/ProductCard";
import CardCarousel from "@/components/CardCarousel";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

export default function ProductsSection({
  title,
  orderBy,
  categoryId,
  categoryName,
  sellerId,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let query = "/products";
    if (orderBy) query += `?orderBy=${orderBy}`;
    if (categoryId) query += `?category=${categoryId}`;
    if (sellerId) query += `?userId=${sellerId}`;

    const fetchProducts = async () => {
      let productsData = await fetchHorseted(query);

      if (productsData.total === 0) return;

      setProducts(productsData.items.slice(0, 16));
      setIsLoading(false);
    };

    fetchProducts();
  }, [orderBy, categoryId, sellerId]);

  if (isLoading || products.length <= 1) return null;

  return (
    <section className="pb-14 lg:pb-24 bg-light-grey">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between flex-nowrap mb-4 lg:mb-5">
          <h3 className="font-mcqueen font-bold text-[20px] whitespace-nowrap lg:text-[32px] capitalize">
            {title}
          </h3>
          <Button
            href={
              sellerId
                ? `/vendeur/${sellerId}`
                : `/articles${categoryId && categoryName ? `?categoryId=${categoryId}&categoryName=${categoryName}` : ""}`
            }
            variant="transparent-green"
            className="border-none px-0 font-bold pr-0 lg:border-solid lg:px-5"
          >
            Voir tout
            <RightArrow className="ml-2" />
          </Button>
        </div>
        {products.length <= 4 ? (
          <div className="flex">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  className="mb-8 mr-6 lg:mr-12"
                  product={product}
                />
              );
            })}
          </div>
        ) : (
          <CardCarousel>
            {products.map((product, index) => {
              return (
                <div
                  className={`block ${index >= 4 ? "hidden md:block" : ""} ${
                    index >= 16 ? "hidden lg:block" : ""
                  }`}
                  key={product.id}
                >
                  <ProductCard
                    className="mb-8 mr-6 lg:mr-12"
                    product={product}
                  />
                </div>
              );
            })}
          </CardCarousel>
        )}
      </div>
    </section>
  );
}
