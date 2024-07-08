"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from "@/assets/icons/PrevArrow";
import NextArrow from "@/assets/icons/NextArrow";
import "@/app/styles/product-images-carousel.css";
import ClientProductImage from "@/components/ClientProductImage";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute bg-white rounded-full border border-black top-1/2 transform -translate-y-1/2 right-2 lg:top-auto lg:transform-none lg:bottom-3 lg:right-3 cursor-pointer"
      style={{
        height: "29px",
        width: "29px",
      }}
      onClick={onClick}
    >
      <NextArrow
        style={{
          position: "absolute",
          height: "12px",
          top: "7px",
          left: "10px",
          width: "auto",
        }}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute bg-white rounded-full border border-black top-1/2 transform -translate-y-1/2 left-2 lg:top-auto lg:transform-none lg:left-auto lg:bottom-3 lg:right-[50px] z-10 cursor-pointer"
      style={{
        height: "29px",
        width: "29px",
      }}
      onClick={onClick}
    >
      <PrevArrow
        style={{
          position: "absolute",
          height: "12px",
          top: "7px",
          left: "8px",
          width: "auto",
        }}
      />
    </div>
  );
}

export default function ProductImagesCarousel({ product, medias }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
  };
  return (
    <>
      <div className="flex max-w-full h-full lg:max-h-[calc(100vh_-_var(--header-height)-100px)]">
        <div className="nav-slider hidden w-fit bg-white lg:rounded-tl-[25px] lg:rounded-bl-[25px] lg:flex justify-center overflow-hidden p-4 pb-0">
          <Slider
            asNavFor={nav1}
            arrows={false}
            ref={(slider) => (sliderRef2 = slider)}
            initialSlide={0}
            slidesToShow={4}
            swipeToSlide={true}
            focusOnSelect={true}
            vertical={true}
            verticalSwiping={true}
            infinite={true}
            className="lg:max-h-[172px] lg:max-w-[172px] lg:flex lg:items-center lg:justify-center"
          >
            {medias.map((media, index) => (
              <div
                key={index}
                className={`cursor-pointer [&_img]:aspect-[172/172] [&_img]:rounded-lg ${
                  index === activeSlide
                    ? "[&_img]:border-4 [&_img]:border-light-green"
                    : ""
                }`}
              >
                <ClientProductImage product={product} media={media} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full lg:w-2/3 main-slider [&>*]:h-full">
          <Slider
            {...settings}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
            className="relative h-full [&>*]:h-full"
          >
            {medias.map((media, index) => (
              <div
                className="h-full w-full [&_img]:aspect-[590/590] [&>*]:w-full  [&>*]:h-full"
                key={index}
              >
                <ClientProductImage product={product} media={media} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
